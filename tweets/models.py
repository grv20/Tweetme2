import random
from django.db import models
from django.conf import settings
# Create your models here.

User = settings.AUTH_USER_MODEL

class Tweet(models.Model):
    # id = models.AutoField(primary_key=True)
    #user = models.ForeignKey(User, null=True, on_delete=models.CASCADE.SET_NULL) 
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    #one tweet can have only obe user, while a user can have many tweets
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)\

    class Meta:
        ordering = ['-id']

    def serialize(self):
        return{
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0,200),
            "time": self.date_created
        }

    def __str__(self):
        return self.content