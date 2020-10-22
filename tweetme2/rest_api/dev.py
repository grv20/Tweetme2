from django.contrib.auth import get_user_model
from rest_framework import authentication

User = get_user_model()

class DevAuthentication(authentication.BasicAuthentication):
    def authenticate(self, request):
        qs = User.objects.all()
        print("Running")
        user = qs.order_by("?").first()#it will give a random user
        return (user, None)