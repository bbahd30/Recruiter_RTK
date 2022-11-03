from email.policy import default
from django.db import models
from django.db.models import CASCADE
from django.contrib.auth.models import AbstractUser 
# imports for Token Authentications
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token 

class Member(AbstractUser):
    '''
        IMG member's data using the Omniport Authentication
        Using the AbstractUserModel
    '''
    name = models.CharField(max_length=40)
    enroll_no = models.IntegerField(null = True, blank=True)
    profile_pic = models.ImageField(upload_to = '', blank = True, null=True)
    college_joining_year = models.PositiveSmallIntegerField(blank=True, null=True)    
    academic_year = models.PositiveSmallIntegerField(null=True, blank=True)

    def __str__(self):
        return self.username

class Season(models.Model):
    '''
        Recruitment Season created
    '''
    year = models.PositiveSmallIntegerField()
    season_name = models.CharField(max_length=100)
    description = models.CharField(max_length=5000)

    def __str__(self):
        return str(self.year)

class Round(models.Model):
    '''
        Used for creating various rounds, interview or test and linked using season id
    '''
    round_choices = (
        ("t", "Test"),
        ("int", "Interview"),
    )
    round_name = models.CharField(max_length=100)
    round_type = models.CharField(max_length=20, choices=round_choices, default="int")
    # can this be a foreign key?
    season_id = models.ForeignKey(Season, on_delete = CASCADE, default= 1)

    def __str__(self):
        return self.round_name 

class Section(models.Model):
    '''
        Manages the sections of the test and interview
    '''
    section_name = models.CharField(max_length=100)
    round_id = models.ManyToManyField(Round)
    weightage = models.FloatField()

    def __str__(self):
        return self.section_name

class Question(models.Model):
    '''
        Created for questions to be added during the test or interview
    '''

    section_id = models.ForeignKey(Section, on_delete = CASCADE, default = 1)
    question_text = models.CharField(max_length=500)
    ans = models.CharField(max_length=500)
    total_marks = models.FloatField()
    assignee_id = models.ManyToManyField(Member)
    def __str__(self):
        return self.question_text

class Applicant(models.Model):
    '''
        Handles the registered applicant's data taken from the forms
    '''
    name = models.CharField(max_length=20)
    academic_year = models.PositiveSmallIntegerField(blank=True)
    enroll_no = models.BigIntegerField(blank= True, unique = True)
    role_choices = (
        ("dev", "Developer"),
        ("design", "Designer")
    )
    role = models.CharField(max_length=15, choices= role_choices, default="dev")
    project = models.BooleanField(default=False)
    project_link = models.CharField(max_length=500, null=True, blank=True)
    cg = models.IntegerField(blank=True, null=True)
    status = models.ForeignKey(Round, on_delete=CASCADE)        # at which round the student has reached
    phone_no = models.BigIntegerField(blank= True, null = True, unique = True)
    # converted season_id to foreign key
    season_id = models.ForeignKey(Season, on_delete = CASCADE)

    def __str__(self):
        return self.name

class InterviewPanel(models.Model):
    status_choices = (
        ("1", "Active"),
        ("2", "Inactive")
    )
    # active, inactive, student late
    name = models.CharField(max_length=30)
    status = models.CharField(max_length=12, choices=status_choices, default=2)
    members = models.ManyToManyField(Member)
    location = models.CharField(max_length=100)
    applicant_id = models.ManyToManyField(Applicant)

    def __str__(self):
        return self.name

class Interview(models.Model):
    status_choice = (
        ("0", "Rejected"),
        ("1", "Accepted"),
    )
    # accepted, rejected
    status = models.CharField(max_length=20, choices=status_choice, default=0)
    remarks = models.CharField(max_length=500, null = True, blank = True)
    round_id = models.ForeignKey(Round, on_delete=CASCADE)
    marks = models.FloatField(null = True, blank = True)
    time_slot = models.TimeField()
    interview_panel_id = models.ManyToManyField(InterviewPanel)

    def __str__(self):
        return str(self.interview_panel_id)

# str not defined properly
class Score(models.Model):
    '''
        Stores the score and remarks
    '''
    question_id = models.ManyToManyField(Question)
    # Converting many to many field to foreign key for student id so that the student id can provide access
    student_id = models.ManyToManyField(Applicant)
    marks_awarded = models.FloatField()
    remarks = models.CharField(max_length=50)
    status_choices = (
        ("0", "Not Evaluated"),
        ("1", "Evaluated")
    )
    status = models.CharField(max_length=33, choices=status_choices, default=0)        # checked or not
    
    # def __str__(self):
    #     return self.objects.select_related(Question).filter(id = self.question_id)
    
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)