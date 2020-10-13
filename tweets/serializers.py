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
    #This is a read-only field. It gets its value by calling a method on the serializer class it is attached to.
    #It can be used to add any sort of data to the serialized representation of your object
    #since i am defining this here, i must define function like get_likes
    class Meta:
        model = Tweet
        fields = ['id','content','likes','timestamp']
        
    def get_likes(self,obj):
       #The serializer method referred to by the method_name argument should accept a single argument
       #(in addition to self), which is the object being serialized.
       # It should return whatever you want to be included in the serialized representation of the object. 
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
    #OR parent = TweetCreateSerializer(read_only=true)
    class Meta:
        model = Tweet
        fields = ['id','content','likes','timestamp', 'is_retweet', 'og_tweet']

    def get_likes(self,obj):
        #we want number of likes, not who liked it, thats why we are sending custom response
        return obj.likes.count()
    
    



