from django.conf import settings
from rest_framework import serializers
from .models import Tweet
MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS

class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)
    
    def validate_action(self,value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("This is not a valid action for tweets.")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    #using this for tweet create view
    likes = serializers.SerializerMethodField(read_only=True)
    #since i am defining this here, i must define function like get_likes
    class Meta:
        model = Tweet
        fields = ['id','content','likes','timestamp']
        
    def get_likes(self,obj):
        #the whole object is passed to it, and we are extracting likes from it
        #we want to initialize it this way, we dont want to fill null
        return obj.likes.count()

    def validate_content(self,value):
        #from object only content is passed to it
        #print(value)
        if len(value) > MAX_TWEET_LENGTH:
            raise serializers.ValidationError("This tweet is too long.")
        return value


class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    og_tweet = TweetCreateSerializer(source='parent',read_only=True)
    
    class Meta:
        model = Tweet
        fields = ['id','content','likes','timestamp', 'is_retweet', 'og_tweet']

    def get_likes(self,obj):
        #we want number of likes, not who liked it
        return obj.likes.count()
    
    



