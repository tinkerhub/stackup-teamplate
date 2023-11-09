
from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.indexReg, name="register"),
    path('login/',views.login,name="login"),
     path('user/', views.print1, name='index'),
    path('update/<int:id>',views.update, name='update'),
    path('delete/<int:idd>',views.delete, name='delete'),   

]
