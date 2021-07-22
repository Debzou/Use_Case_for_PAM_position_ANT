import unittest
import requests
from datetime import datetime


class TestRequestMethods(unittest.TestCase):

    def test_hello_world(self):
        response = requests.get("http://localhost:5000")
        self.assertEqual(int(response.status_code), 200)
        self.assertEqual(response.text, 'Welcome')

    def test_post_get_location(self):
        responsePost = requests.post("http://localhost:5000/location",json={'location':str([0,0])})
        self.assertEqual(int(responsePost.status_code), 200)
        responseGet = requests.get("http://localhost:5000/location")
        self.assertEqual(int(responseGet.status_code), 200)
        self.assertTrue('[0, 0]' in responseGet.text)
    
    def test_post_get_tweet(self):
        timeTweet = int(datetime.timestamp(datetime.now()) * 1000)
        responsePost = requests.post("http://localhost:5000/hastage",json={ 'name':'name',
            'timestamp':timeTweet ,
            'hastageList': ['#'], 
            'text':'text',
            'retweet_count':0,
            'favorite_count':0
        })
        self.assertEqual(int(responsePost.status_code), 200)
        responseGet = requests.get("http://localhost:5000/hastage/minutes")
        self.assertEqual(int(responseGet.status_code), 200)
        self.assertTrue(str(timeTweet) in responseGet.text)


if __name__ == '__main__':
    unittest.main()
