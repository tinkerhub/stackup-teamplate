from django.db import models

class Task(models.Model):
    task= models.CharField(max_length=20)
    details=models.TextField(max_length=50) 