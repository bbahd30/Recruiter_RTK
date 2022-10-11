from django.shortcuts import redirect
from django.http import HttpResponse, HttpResponseRedirect
from .links import client_data
from Recruiter.models import Member
import requests

def login(request):
    client_id = client_data['client_id']
    client_secret_key = client_data['client_secret_key']
    redirect_uri = 'http://127.0.0.1:8000/login/'
    
    if str(request.GET['state']) == "member_allowed_sharing_info":
        code = request.GET['code']

    data = {
        'client_id': client_id,
        'client_secret': client_secret_key,
        'grant_type': 'authorization_code',
        'redirect_uri': redirect_uri,
        'code': code
    }

    url = 'https://channeli.in/open_auth/token/'
    access_data = requests.post(url,data)

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
                try:
                    memberExists = Member.objects.get(enroll_no = member_json_info.get('student').get('enrolmentNumber'))
                except Member.DoesNotExist:
                    print("doing only for those who are not in db")
                    memberAdding = Member(
                                            username = member_json_info.get ('username'),
                                            name = member_json_info.get('person').get('fullName'),
                                            profile_pic = member_json_info.get('person').get('displayPicture'),
                                            academic_year = member_json_info.get('student').get('currentYear'),
                                            enroll_no = member_json_info.get('student').get('enrolmentNumber')
                                        )
                    memberAdding.save()
                return redirect('dashboard')
        else:
            return HttpResponse("Failed to get member data")
    else:
        return HttpResponse("Failed to get data")
        
def firstPage(request):
    url = "<a href = 'http://127.0.0.1:8000/authorize'>Auth</a>"
    return HttpResponse("This is the link to go for "+ url)

def authorize(request):
    url = "https://channeli.in/oauth/authorise/?client_id=" + client_data['client_id'] + "&redirect_uri=http://127.0.0.1:8000/login/&state=member_allowed_sharing_info"
    return HttpResponseRedirect(url)

def dashboard(request):
    return HttpResponse("This is dashboard")