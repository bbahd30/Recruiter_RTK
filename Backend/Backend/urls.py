from unicodedata import name
from django.contrib import admin
from django.urls import path, include, re_path
from Recruiter.views import *
from rest_framework.routers import DefaultRouter
from django.views.decorators.cache import cache_control
from django.contrib.staticfiles.views import serve
from django.conf.urls.static import static
from . import settings

# router = DefaultRouter()
# router.register(r'members', MemberViewset, basename='members')
# router.register(r'seasons', SeasonViewset, basename='seasons')
# router.register(r'rounds', RoundViewset, basename='rounds')
# router.register(r'sections', SectionViewset, basename='sections')
# router.register(r'questions', QuestionViewset, basename='questions')
# router.register(r'applicants', ApplicantViewset, basename='applicants')
# router.register(r'interviewPanels', InterviewPanelViewset, basename='interviewPanels')
# router.register(r'interview', InterviewViewset, basename='interview')
# router.register(r'scores', ScoreViewset, basename='scores')

router = DefaultRouter()

router.register(r'seasons/(?P<year>[0-9]+)/applicants', ApplicantViewsetImpData, basename='applicants'),
# router.register()


router.register(r'seasons', SeasonViewset, basename='seasons')


router.register(r'members', MemberViewset, basename='members')
router.register(r'rounds', RoundViewset, basename='rounds')
router.register(r'sections', SectionViewset, basename='sections')
router.register(r'questions', QuestionViewset, basename='questions')
router.register(r'interviewPanels', InterviewPanelViewset, basename='interviewPanels')
router.register(r'interview', InterviewViewset, basename='interview')
router.register(r'scores', ScoreViewset, basename='scores')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('enter/', enter, name='enter'),
    path('loginpage/', loginpage, name='loginpage'),
    path('authorize/', authorize, name='authorize'),
    path('dashboard/', dashboard, name='dashboard'),

    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
    path('logout/', logout_member, name = 'logout_member')
]

urlpatterns += static(settings.STATIC_URL, view=cache_control(no_cache=True, must_revalidate=True)(serve))