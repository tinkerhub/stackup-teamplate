from django.db import models


# Create your models here.
class User(models.Model):
    username= models.EmailField(max_length=50)
    password=models.CharField(max_length=25)
    uid = models.IntegerField()

class Register(models.Model):
    name = models.CharField(max_length=25)
    email=models.EmailField(max_length=50)
    password=models.CharField(max_length=25)


