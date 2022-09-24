from django.contrib import admin
from django.urls import path
from Recruiter.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login, name='login'),
    path('', firstPage, name='firstPage'),
    path('authorize/', authorize, name='authorize'),
    path('dashboard/', dashboard, name='dashboard')
]