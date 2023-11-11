from django.urls import path
from quizzapp import views

urlpatterns = [
    #lofin and sign up paths are here
    path('createuser', views.createuser, name='createuser'),
    path('login', views.login, name='login'),
    path('', views.index, name='index'),
    ]