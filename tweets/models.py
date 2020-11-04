from django.db import models
from django.db.models import Q
from django.conf import settings
# Create your models here.

User = settings.AUTH_USER_MODEL

class TweetLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    tweet = models.ForeignKey("Tweet", on_delete=models.CASCADE) 
    #"Tweet" is used bcoz tweet model is below this model
    timestamp = models.DateTimeField(auto_now_add=True)

class TweetQuerySet(models.QuerySet):
    #can use functions defined here in place of something like .filter()
    def by_username(self,username):
        return self.filter(user__username__iexact=username)

    def feed(self,user):
        profiles_exist = user.following.exists()
        followed_users_id = []
        if profiles_exist:
            followed_users_id = user.following.values_list("user__id", flat=True) 
            #this is much more efficient query
            #[x.user.id for x in profiles]
        return self.filter(
            Q(user__id__in=followed_users_id) |
            Q(user=user)
        ).distinct().order_by("-timestamp")
           

class TweetManager(models.Manager):
    
    def get_queryset(self, *args, **kwargs):
        return TweetQuerySet(self.model, using=self._db)
    
    #can use functions defined below in this class in place of .objects as in{Tweet.objects}
    def feed(self, user):
        return self.get_queryset().feed(user)
    
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
    
    objects = TweetManager()

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