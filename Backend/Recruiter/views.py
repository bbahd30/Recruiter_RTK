from Recruiter.models import Member
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

def authenticate(request, member_json_info):
    try:
        member_login = Member.objects.get(enroll_no = member_json_info.get('student').get('enrolmentNumber'))
    except Member.DoesNotExist:
        member_login = Member(
                            username = member_json_info.get ('username'),
                            name = member_json_info.get('person').get('fullName'),
                            profile_pic = member_json_info.get('person').get('displayPicture'),
                            academic_year = member_json_info.get('student').get('currentYear'),
                            enroll_no = member_json_info.get('student').get('enrolmentNumber'),
                            college_joining_year = member_json_info.get('student').get('startDate')[:4]
                        )
        member_login.save()

    return member_login

def auto_login(request, member_json_info, from_para):
    if from_para == "new":
        member_login = authenticate(request, member_json_info)
        login(request, member_login)

    if from_para == "old":
        print("old")
        print(member_json_info)
        member_login = member_json_info
        
def enter(request):
    client_id = client_data['client_id']
    client_secret_key = client_data['client_secret_key']
    redirect_uri = 'http://127.0.0.1:8000/enter/'
    
    if str(request.GET['state']) == "member_allowed_sharing_info":
        code = request.GET['code']

class RoundViewset(viewsets.ModelViewSet):
    queryset = Round.objects.all()
    serializer_class = RoundSerializer
    # permission_classes = [delPermission]

class SectionViewset(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

    if access_data.status_code == 200:
        access_data_json = access_data.json()
        access_token = access_data_json['access_token']
        auth_header = {
            'Authorization': "Bearer " + access_token
        }

        url = "https://channeli.in/open_auth/get_user_data/"
        member_info = requests.get(url,headers = auth_header)
        member_json_info = member_info.json()
        if member_info.status_code == 200:
            member = False
            for role in member_json_info.get('person').get('roles'):
                    if role['role'] == "Maintainer":
                        member = True
            
            if member:
                print("called")
                auto_login(request, member_json_info, "new")
            else:
                return redirect("google.com")
        else:
            return HttpResponse("Failed to get member data")
    else:
        return HttpResponse("Failed to get data")

    return redirect('dashboard')

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def loginpage(request):
    if request.user.is_authenticated:
        member_json_info = model_to_dict(Member.objects.get(username = request.user.username)) 
        auto_login(request, member_json_info, "old")
        return redirect('http://127.0.0.1:8000/dashboard/')
    return render(request, 'index.html')

def authorize(request):
    url = "https://channeli.in/oauth/authorise/?client_id=" + client_data['client_id'] + "&redirect_uri=http://127.0.0.1:8000/enter/&state=member_allowed_sharing_info"
    return HttpResponseRedirect(url)

@api_view(['GET'])
def logout_member(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse("Logged Out")
    return HttpResponse("Failed to log out")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):
    return HttpResponse("This is dashboard")

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
    '''
        ApplicantViewset for Imp data, only accessible to the 3rd or 4th yearites, so applying the permission class, so made a different viewset, so that the access to others is not given by the has_permission method. 
    '''
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializerImpData
    # permission_classes = [ImpDataPermission]

class SeasonWiseViewset(viewsets.ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer
    permission_classes = [ImpDataPermission]

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








# from django.shortcuts import redirect
# from django.http import HttpResponse, HttpResponseRedirect
# from .links import client_data
# from Recruiter.models import Member
# import requests
# from .serializers import *
# from rest_framework import viewsets
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated, AllowAny
# from .permissions import *
# from rest_framework.decorators import api_view, permission_classes, action
# from django.contrib.auth import login, logout
# from django.forms.models import model_to_dict
# from django.shortcuts import render

# def authenticate(request, member_json_info):
#     try:
#         member_login = Member.objects.get(enroll_no = member_json_info.get('student').get('enrolmentNumber'))
#     except Member.DoesNotExist:
#         member_login = Member(
#                             username = member_json_info.get ('username'),
#                             name = member_json_info.get('person').get('fullName'),
#                             profile_pic = member_json_info.get('person').get('displayPicture'),
#                             academic_year = member_json_info.get('student').get('currentYear'),
#                             enroll_no = member_json_info.get('student').get('enrolmentNumber'),
#                             college_joining_year = member_json_info.get('student').get('startDate')[:4]
#                         )
#         member_login.save()

#     return member_login

# def auto_login(request, member_json_info, from_para):
#     if from_para == "new":
#         member_login = authenticate(request, member_json_info)
#         login(request, member_login)

#     if from_para == "old":
#         print("old")
#         print(member_json_info)
#         member_login = member_json_info
        
# def enter(request):
#     client_id = client_data['client_id']
#     client_secret_key = client_data['client_secret_key']
#     redirect_uri = 'http://127.0.0.1:8000/enter/'
    
#     if str(request.GET['state']) == "member_allowed_sharing_info":
#         code = request.GET['code']

#     data = {
#         'client_id': client_id,
#         'client_secret': client_secret_key,
#         'grant_type': 'authorization_code',
#         'redirect_uri': redirect_uri,
#         'code': code
#     }

#     url = 'https://channeli.in/open_auth/token/'
#     access_data = requests.post(url,data)

#     if access_data.status_code == 200:
#         access_data_json = access_data.json()
#         access_token = access_data_json['access_token']
#         auth_header = {
#             'Authorization': "Bearer " + access_token
#         }

#         url = "https://channeli.in/open_auth/get_user_data/"
#         member_info = requests.get(url,headers = auth_header)
#         member_json_info = member_info.json()
#         if member_info.status_code == 200:
#             member = False
#             for role in member_json_info.get('person').get('roles'):
#                     if role['role'] == "Maintainer":
#                         member = True
            
#             if member:
#                 print("called")
#                 auto_login(request, member_json_info, "new")
#             else:
#                 return redirect("google.com")
#         else:
#             return HttpResponse("Failed to get member data")
#     else:
#         return HttpResponse("Failed to get data")

#     return redirect('dashboard')

# def index(request):
#     print("called")
#     return render(request, 'index.html')

# @api_view(['GET', 'POST'])
# @permission_classes([AllowAny])
# def loginpage(request):
#     if request.user.is_authenticated:
#         member_json_info = model_to_dict(Member.objects.get(username = request.user.username)) 
#         auto_login(request, member_json_info, "old")
#         return redirect('http://127.0.0.1:8000/dashboard/')

#     index(request)
#     return Response("Logged In already")

# def authorize(request):
#     url = "https://channeli.in/oauth/authorise/?client_id=" + client_data['client_id'] + "&redirect_uri=http://127.0.0.1:8000/enter/&state=member_allowed_sharing_info"
#     return HttpResponseRedirect(url)

# @api_view(['GET'])
# def logout_member(request):
#     if request.user.is_authenticated:
#         logout(request)
#         return HttpResponse("Logged Out")
#     return HttpResponse("Failed to log out")

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def dashboard(request):
#     return HttpResponse("This is dashboard")

# class MemberViewset(viewsets.ModelViewSet):
#     queryset = Member.objects.all()
#     serializer_class = MemberSerializer

# class SeasonViewset(viewsets.ModelViewSet):
#     queryset = Season.objects.all()
#     serializer_class = SeasonSerializer

# class RoundViewset(viewsets.ModelViewSet):
#     queryset = Round.objects.all()
#     serializer_class = RoundSerializer
#     # permission_classes = [delPermission]

# class SectionViewset(viewsets.ModelViewSet):
#     queryset = Section.objects.all()
#     serializer_class = SectionSerializer

# class QuestionViewset(viewsets.ModelViewSet):
#     queryset = Question.objects.all()
#     serializer_class = QuestionSerializer

# class ApplicantViewsetImpData(viewsets.ModelViewSet):
#     queryset = Applicant.objects.all()
#     serializer_class = ApplicantSerializerImpData

#     @action(methods=['GET'], detail = False, url_name='applicants', url_path='applicants')
#     def get_applicant_imp(self,request):
#         print("jslfj")
#         print(request)
        
# # class ApplicantViewset(viewsets.ModelViewSet):
# #     queryset = Applicant.objects.all()
# #     serializer_class = ApplicantSerializerImpData
# #     # permission_classes = [UnableToSeePreviousSeason,IsAbleToSeePersonalInfo,]
    

# #     # def get_applicant(request, year, id):
# #     #     print("hey oc")


# class InterviewPanelViewset(viewsets.ModelViewSet):
#     queryset = InterviewPanel.objects.all()
#     serializer_class = InterviewPanelSerializer

# class InterviewViewset(viewsets.ModelViewSet):
#     queryset = Interview.objects.all()
#     serializer_class = InterviewSerializer
#     permission_classes = [IsAbleToSeePersonalInfo,UnableToSeePreviousSeason]

# class ScoreViewset(viewsets.ModelViewSet):
#     queryset = Score.objects.all()
#     serializer_class = ScoreSerializer
#     permission_classes = [IsAbleToSeePersonalInfo, UnableToSeePreviousSeason]