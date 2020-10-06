import random
from django.db import models

# Create your models here.

class Tweet(models.Model):
    # id = models.AutoField(primary_key=True)
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