
"""task_management URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/

"""
from django.contrib import admin
from django.urls import path,include
from to_do import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('to_do.urls'))
]
