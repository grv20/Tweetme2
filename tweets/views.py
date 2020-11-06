import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect, HttpResponseRedirect
from django.utils.http import  is_safe_url


# from .forms import TweetForm
# from .models import Tweet
# from .serializers import TweetSerializer, TweetCreateSerializer, TweetActionSerializer

# from rest_framework.authentication import SessionAuthentication
# from rest_framework.decorators import api_view, authentication_classes, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response


ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.


def home_view(request, *args, **kwargs):
    username = None
    if request.user.is_authenticated:
        username = request.user.username
    return render(request,"pages/feed.html")

def tweets_list_view(request, *args, **kwargs):
    print(request.user)
    return render(request,"tweets/list.html")

def tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request,"tweets/detail.html", context={"tweet_id":tweet_id})











