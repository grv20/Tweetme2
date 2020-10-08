from django.conf import settings
from django import forms
from .models import Tweet
MAX_TWEET_LENGTH = settings.MAX_TWEET_LENGTH

class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        fields = ['content']

    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_TWEET_LENGTH:
            raise forms.ValidationError("This tweet is too long.")
        return content

#cleaned_data will always only contain a key for fields defined in the Form, even if you pass extra data when you define the Form.