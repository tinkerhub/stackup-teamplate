from django.db import models

# Create your models here.
<<<<<<< HEAD
=======
  
class Register(models.Model):
    name= models.CharField(max_length=25)
    email=models.EmailField(max_length=50)
    password=models.CharField(max_length=25)
>>>>>>> c807127078a290645a377f5f80b80b8c9dba23fe
