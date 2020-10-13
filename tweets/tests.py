from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Tweet
# Create your tests here.
User = get_user_model()

class TweetTestCase(TestCase):
    def setUp(self): #this has to be in camel Case
    #it is called everytime a new test runs
        self.user = User.objects.create_user(username='cfe', password='somepassword')
        self.userb = User.objects.create_user(username='cfe2', password='somepassword2')
        self.tweet1 = Tweet.objects.create(content="my first tweet", user=self.user)
        self.tweet2 = Tweet.objects.create(content="my second tweet", user=self.user)
        self.tweet3 = Tweet.objects.create(content="my third tweet", user=self.userb)
        self.currentCount = Tweet.objects.all().count()


    def tearDown(self):
        del self.tweet1
        del self.tweet2
        del self.tweet3


    def test_tweet_created(self): #this has to start with test_
        tweet_obj = Tweet.objects.create(content="my fourth tweet", user=self.user)
        #print(tweet_obj.id)
        #self.assertEqual(tweet_obj.id,4)
        self.assertEqual(tweet_obj.user, self.user)
    
    def get_client(self):
        client = APIClient()
        client.login(username=self.user.username, password='somepassword')
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/')
        self.assertEqual(response.status_code,200)
        self.assertEqual(len(response.json()),3)
        #print(response.json())
        

    def test_action_like(self):
        client = self.get_client()
        id1 = self.tweet1.id
        response = client.post('/api/tweets/action/', {"id":id1, "action":"like"})
        self.assertEqual(response.status_code,200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count,1)
        print(response.json())

    def test_action_unlike(self):
        client = self.get_client()
        id2 = self.tweet2.id
        response = client.post('/api/tweets/action/', {"id":id2, "action":"like"})
        self.assertEqual(response.status_code,200)
        response = client.post('/api/tweets/action/', {"id":id2, "action":"unlike"})
        self.assertEqual(response.status_code,200)
        like_count = response.json().get("likes")
        self.assertEqual(like_count,0)
        print(response.json())


    def test_action_retweet(self):
        client = self.get_client()
        id1 = self.tweet1.id
        current_count = self.currentCount
        response = client.post('/api/tweets/action/', {"id":id1, "action":"retweet"})
        self.assertEqual(response.status_code,201)
        data = response.json()
        new_tweet_id = data.get("id")
        #self.assertNotEqual(2,new_tweet_id)
        # self.assertEqual(current_count+1, new_tweet_id)
        print(new_tweet_id)
        print(response.json())


    def test_tweet_create_api_view(self):
        requested_data = {"content": "This is my test"}
        client = self.get_client()
        current_count = self.currentCount
        response = client.post('/api/tweets/create/', requested_data)
        self.assertEqual(response.status_code,201)
        response_data = response.json()
        new_tweet_id = response_data.get("id")
        #self.assertEqual(current_count+1, new_tweet_id)
        print(new_tweet_id)
        print(response_data)

    def test_tweet_detail_api_view(self):
        client = self.get_client()
        id1 = str(self.tweet1.id)
        response = client.get("/api/tweets/"+id1+"/")
        self.assertEqual(response.status_code,200)
        data = response.json()
        _id =  data.get("id")
        #self.assertEqual(_id,1)
        print(data)

    def test_tweet_delete_api_view(self):
        client = self.get_client()
        id2 = str(self.tweet2.id)
        response = client.delete("/api/tweets/"+id2+"/delete/")
        self.assertEqual(response.status_code,200)
        client = self.get_client()
        response = client.delete("/api/tweets/1/delete/")
        self.assertEqual(response.status_code,404)
        id3 = str(self.tweet3.id)
        response = client.delete("/api/tweets/"+id3+"/delete/")
        self.assertEqual(response.status_code,401)
        