from Recruiter.models import Member
from .serializers import *
from rest_framework import viewsets
from .permissions import *
from .userViews import *
from rest_framework.decorators import action

class MemberViewset(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class SeasonViewset(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer

class RoundViewset(viewsets.ModelViewSet):
    queryset = Round.objects.all()
    serializer_class = RoundSerializer
    # permission_classes = [delPermission]

class SectionViewset(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class QuestionViewset(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ApplicantViewsetImpData(viewsets.ModelViewSet):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializerImpData

    @action(methods=['GET'], detail = False, url_name='applicants', url_path='applicants')
    def get_applicant_imp(self,request):
        print("jslfj")
        print(request)
        
# class ApplicantViewset(viewsets.ModelViewSet):
#     queryset = Applicant.objects.all()
#     serializer_class = ApplicantSerializerImpData
#     # permission_classes = [UnableToSeePreviousSeason,IsAbleToSeePersonalInfo,]
    

#     # def get_applicant(request, year, id):
#     #     print("hey oc")


class InterviewPanelViewset(viewsets.ModelViewSet):
    queryset = InterviewPanel.objects.all()
    serializer_class = InterviewPanelSerializer

class InterviewViewset(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    permission_classes = [IsAbleToSeePersonalInfo,UnableToSeePreviousSeason]

class ScoreViewset(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = [IsAbleToSeePersonalInfo, UnableToSeePreviousSeason]