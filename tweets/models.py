from django.db import models
from django.conf import settings
# Create your models here.

User = settings.AUTH_USER_MODEL

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE) 
    #"Tweet" is used bcoz tweet model is below this model
    timestamp = models.DateTimeField(auto_now_add=True)
    
    
class Tweet(models.Model):
    # id = models.AutoField(primary_key=True)
    parent = models.ForeignKey("self", null=True, on_delete=models.SET_NULL)
    # by default tweet wont have parent but when I re-tweet it will have parent
    #user = models.ForeignKey(User, null=True, on_delete=models.CASCADE.SET_NULL) 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tweets") 
    #one tweet can have only obe user, while a user can have many tweets
    likes = models.ManyToManyField(User, related_name='tweet_user',blank=True, through=TweetLike)
    #due to manytomany we can have list of users instead of one in above.
    content = models.TextField(blank=True, null=True)
    image = models.FileField(upload_to='images/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent != None

    def serialize(self):
        '''
        Can be deleted! of No use Now!
        '''
        return{
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0,200),
            "time": self.timestamp
        }

    #def __str__(self):
        #return self.content