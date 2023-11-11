from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

#for user profile contents
User = get_user_model()
class Profiles(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id_user = models.IntegerField(null=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
    
