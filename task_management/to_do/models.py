from django.db import models

class Register(models.Model):
    name= models.CharField(max_length=25)
    email=models.EmailField(max_length=50)
    password=models.CharField(max_length=25)

class Task(models.Model):
    task= models.CharField(max_length=20)
    details=models.TextField(max_length=50) 
class User(models.Model):
    username= models.EmailField(max_length=50)
    password=models.CharField(max_length=25)
    uid = models.IntegerField()


