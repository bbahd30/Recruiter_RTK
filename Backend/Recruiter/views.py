from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseRedirect
from .links import client_data
from Recruiter.models import Member
from rest_framework import status
import requests
from .serializers import *
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .permissions import *
from rest_framework.decorators import api_view, permission_classes, action
from django.contrib.auth import login, logout
from django.forms.models import model_to_dict
from django.shortcuts import render

class MemberViewset(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

# note: NOT BEING USED ANYMORE AS THE SEASON DATA IS BEING GOVERNED BY SeasonWiseViewset

# class SeasonViewset(viewsets.ModelViewSet):
#     queryset = Season.objects.all()
#     serializer_class = SeasonSerializer

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
    '''
        ApplicantViewset for Imp data, only accessible to the 3rd or 4th yearites, so applying the permission class, so made a different viewset, so that the access to others is not given by the has_permission method. 
    '''
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializerImpData
    # permission_classes = [ImpDataPermission]

class SeasonWiseViewset(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    # permission_classes = [ImpDataPermission]

    @action(detail=False, methods=['get'])
    def get_data(self, request, **kwargs):
        if not kwargs:
            season_data = SeasonSerializer(Season.objects.all(), many = True)
            return Response(season_data.data)
        else:
            s_id = kwargs.get('season_id')
            if len(kwargs) == 1:
                season_data = SeasonSerializer(Season.objects.get(id = s_id))                    
                return Response(season_data.data)
            else:
                model = kwargs.get('model')
                if model == 'applicants':
                    model_data = ApplicantSerializerImpData(Applicant.objects.filter(season_id = s_id), many = True)
                    print(kwargs)
                    if len(kwargs) == 2:
                        return Response(model_data.data)
                    else:
                        print(model_data)
                        model_id = kwargs.get('model_id')
                        model_data = ApplicantSerializerImpData(Applicant.objects.filter(season_id = s_id).filter(id = model_id), many = True)
                        return Response(model_data.data)

    @action(detail=False, methods=['post'])
    def post(self, request, **kwargs):
        if self.request.method == 'POST':
            if not kwargs:
                print(request.data)
                new_season = Season(
                    year = request.data.get('year'),
                    season_name = request.data.get('season_name'),
                    description = request.data.get('description')
                )
                new_season.save();
                return Response(
                    {
                        'msg' : "Season Added"
                    },
                    status= status.HTTP_201_CREATED
                )
            else:
                s_id = kwargs.get('season_id')
                if len(kwargs) == 1:
                    # todo: will do nothing as asked a specific season
                    return Response(
                        {
                            'msg': "Invalid Post Request"
                        }, 
                        status= status.HTTP_400_BAD_REQUEST
                    )
                else:
                    model = kwargs.get('model')
                    if model == 'applicants':
                        if len(kwargs) == 2:
                            new_applicant = Applicant(
                                
                            )
                            new_applicant.save();
                            return Response("Added applicant")
        return Response("Invalid Request")

class InterviewPanelViewset(viewsets.ModelViewSet):
    queryset = InterviewPanel.objects.all()
    serializer_class = InterviewPanelSerializer

class InterviewViewset(viewsets.ModelViewSet):
    queryset = Interview.objects.all()
    serializer_class = InterviewSerializer
    permission_classes = [IsAbleToSeePersonalInfo]

class ScoreViewset(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer
    permission_classes = [IsAbleToSeePersonalInfo]