from rest_framework.permissions import BasePermission

from Recruiter.models import Season
from Recruiter.serializers import *

class ApplicantPermission(BasePermission):
    '''
        Restricts the member from accessing the data of the seasons before or during his recruitment
    '''

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False


class UnableToSeePreviousSeason(BasePermission):
    '''
        Restricts the member from accessing the data of the seasons before or during his recruitment 
    '''
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if view.basename == "applicants":
            season_id = obj.season_id
        if view.basename == "scores":
            serializedData = ScoreSerializer(obj)
            season_id_ordered_dict = serializedData.data.get('student_id')
            # how to take data from many to many field of the students getting ordered dict, how to know which students marks want to see.
            season_id = season_id_ordered_dict[0]
        # if view.basename == "interview":
            # need to put season id but is under many to many so returning an array
        season_year = Season.objects.get(id = season_id.id).year
        if season_year > request.user.college_joining_year:
            return True
        return False

class IsAbleToSeePersonalInfo(BasePermission):
    '''
        Allows the access to the 3rd and 4yr of the current recruitment season, to 
    '''
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.academic_year >= 3:
            return True
        return False