import random
from django.shortcuts import render, redirect, HttpResponseRedirect
from django.http import HttpResponse, Http404, JsonResponse
from django.utils.http import  is_safe_url
from datetime import datetime
from django.db.models.functions import ExtractYear
from django.conf import settings
from .forms import TweetForm
from .models import Tweet

ALLOWED_HOSTS = settings.ALLOWED_HOSTS
# Create your views here.
def home_view(request, *args, **kwargs):
    print(args, kwargs)
    return render(request,"pages/home.html", context={}, status=200)

def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by Javascript/Swift/Java/Android
    return json data
    """
    qs = Tweet.objects.all()
    tweets_list = [{"id": x.id, "content":x.content,
    "time":x.date_created,"likes":random.randint(0,122)} for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)

def tweet_create_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None) #TweetForm class can be initialized with data or not
    next_url = request.POST.get("next") or None
    print("next_url", next_url)
    if form.is_valid(): #if form is invalid page will render invalid form
        obj = form.save(commit=False)
        # do other form related logic
        obj.save()
        if next_url != None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm() #re-initialize blank form
    return render(request, 'components/form.html', context={"form":form})

def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Consume by Javascript/Swift/Java/Android
    return json data
    """
    data = {
            "id": tweet_id,
            }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not Found"
        status = 404
    return JsonResponse(data, status=status) #json.dumps content_type='application/json'
