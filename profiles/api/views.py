import random
from django.conf import settings
from django.contrib.auth import get_user_model
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect, HttpResponseRedirect
from django.utils.http import  is_safe_url

from ..models import Profile
from ..serializers import PublicProfileSerializer

from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

User = get_user_model()
ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.


@api_view(['GET'])
def profile_detail_api_view(request, username, *args, **kwargs):
    #get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Response({"detail":"Use not found"}, status=404)
    profile_obj = qs.first()
    data = PublicProfileSerializer(instance=profile_obj)
    return Response(data.data, status=200) 

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me =  request.user
    other_user_qs = User.objects.filter(username=username)
    #Or profile= Profile.objects.filter(user__username=username).first()
    if me.username == username:
        my_followers = me.profile.followers.all()
        return Response({"count":my_followers.count()}, status=200)
    if other_user_qs.exists() == False:
        return Response({}, status=404)
    other = other_user_qs.first()
    profile = other.profile
    data = request.data or {}
    action = data.get("action")
    if action == "follow":
        profile.followers.add(me)
    elif action == "unfollow":
        profile.followers.remove(me)
    else:
        pass
    current_followers_qs = profile.followers.all()
    return Response({"count":current_followers_qs.count()}, status=200) #no need of JsonResponse now