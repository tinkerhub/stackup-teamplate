
from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.index, name="register"),
    path('login/',views.login,name="login"),
    

    

]