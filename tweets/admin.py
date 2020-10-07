from django.contrib import admin
from .models import Tweet
from django.conf import settings
# Register your models here.

class TweetAdmin(admin.ModelAdmin):
    list_display = ['__str__', 'user']
    search_fields = ['content']
    class Meta:
        model = Tweet

admin.site.register(Tweet, TweetAdmin)