from django.contrib import admin
from django.urls import path, include, re_path
from Recruiter.views import *
from Recruiter.userViews import *
from rest_framework.routers import DefaultRouter
from django.views.decorators.cache import cache_control
from django.contrib.staticfiles.views import serve
from django.conf.urls.static import static
from . import settings

router = DefaultRouter()
router.register(r'applicants', ApplicantViewsetData, basename='applicants')
router.register(r'seasons', SeasonViewset, basename='seasons')
router.register(r'members', MemberViewset, basename='members')
router.register(r'rounds', RoundViewset, basename='rounds')
router.register(r'sections', SectionViewset, basename='sections')
router.register(r'questions', QuestionViewset, basename='questions')
router.register(r'interviewPanels', InterviewPanelViewset, basename='interviewPanels')
router.register(r'interview', InterviewViewset, basename='interview')
router.register(r'scores', ScoreViewset, basename='scores')
router.register(r'questionswithmembers', QuestionViewsetNoMemberData, basename='questionswithmembers')

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('enter/', enter, name='enter'),
    path('checkStatus/', checkStatus, name= "checkStatus"),
    path('authorize/', authorize, name='authorize'),
#     path('dashboard/', dashboard, name='dashboard'),
    path('auth/', include('rest_framework.urls')),
    path('logout/', logout_member, name = 'logout_member'),
     path('upload/', UploadCSV.as_view(), name='upload_csv'),
     # path('firstPage', firstPage),
     path('loginuser', loginUser),
    # note:
    # '''
    #     This one captures the applicant keyword after the season_id hence telling whether to show applicants of that season or not or only that season data
    #     As gives the kwargs to be '1/applicants' instead of '1'
    #     re_path(r'^seasons/(?P<season_id>[0-9]+/?(applicants/?(?    P<applicant_id>[0-9]+)?)?)?/?$',
    #     ApplicantViewsetImpData.as_view
    #     ({
    #          'get':'get_data'
    #     }), name='get_data'),
    # '''




    # note:
    # '''
    #     Works by giving only the ids in kwargs
    # '''
    # re_path(r'^seasons/(?P<season_id>[0-9]+)?(/applicants/(?P<applicant_id>[0-9]+)?)?/?$',
    # ApplicantViewsetImpData.as_view
    # ({
    #      'get':'get_data'
    # }), name='get_data'),

    # note:
    # Final regex which captures the models name as well with the season id whose data has to be displayed
    re_path(r'^seasons/(?P<season_id>[0-9]+)?/?(?P<model>[A-Za-z]+)?/?(?P<model_id>[0-9]+)?/?$',
    SeasonWiseViewset.as_view
    ({
         'get':'get_data'
    }), name='get_data'),

    # note: for using customized api only when want data for posting using the modelviewset default ones
    re_path(r'^rounds/(?P<round_id>[0-9]+)/(?P<model>[A-Za-z]+)/?(?P<model_id>[0-9]+)?/?$',
    RoundWiseSectionViewset.as_view
    ({
         'get':'get_data'
    })),
     re_path(r'^sections/(?P<section_id>[0-9]+)/(?P<model>[A-Za-z]+)/?(?P<model_id>[0-9]+)?/?$',
    SectionWiseQuestionViewset.as_view
    ({
         'get':'get_data'
    })),     
#     re_path(r'^(?P<p_model>[A-Za-z]+)/(?P<p_id>[0-9]+)/(?P<model>[A-Za-z]+)/?(?P<model_id>[0-9]+)?/?$',
#     ParentWiseChildViewset.as_view
#     ({
#          'get':'get_data'
#     })),

     # tells the total marks for the section and status === which round has reached
     re_path(r'^statusSectionMarks/(?P<applicant_id>[0-9]+)/(?P<season_id>[0-9]+)/$', StatusAndSectionMarks.as_view()),

     # gives the question information, of all the required sections, similar to previous modal handling but has the status and score combined here, needed and important to secure, shows only those whose status has been set
     re_path(r'^questionInfoSectionWise/(?P<applicant_id>[0-9]+)/(?P<round_id>[0-9]+)/$', QuestionInfoSectionWise.as_view()),

     re_path('applicantStatus/', ApplicantStatusViewset.as_view({
          'get': 'list'
     }))


]
urlpatterns += static(settings.STATIC_URL, view=cache_control(no_cache=True, must_revalidate=True)(serve))