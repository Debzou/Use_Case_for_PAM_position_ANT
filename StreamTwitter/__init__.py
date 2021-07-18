################################
#       Importing Library      #
################################
import tweepy
from dotenv import load_dotenv
load_dotenv()
import os
import re
import requests


#The Twitter API class allowing us to connect to the twitter API
class TwitterAPI:

    def __init__(self):
       
        # import configuration
        consumer_key = os.environ.get("API_Key")
        consumer_secret = os.environ.get("API_Secret_Key")
        access_token = os.environ.get("Access_Token")
        access_secret = os.environ.get("Access_Token_Secret")

        # Implementation of Tweepy for authentication
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_secret)

        # Create the API and connect us to Twitter with our developer information
        self.api = tweepy.API(auth, wait_on_rate_limit=True, wait_on_rate_limit_notify=True, compression=True)

    def getAPI(self):
        return self.api

# The Twitter API class allowing us to connect to the API stream
class MyStreamListener(tweepy.StreamListener):
    
    # create object for trending
    def __init__(self, api):
        self.api = api
        self.me = api.me()

    # @overide function on_status
    # get only hastage 
    def on_status(self, tweet):
        wordList = tweet.text.split(' ')
        for word in wordList:
            # find the '#'
            if  re.search("^#.*", word):
                # post data via API
                r = requests.post(os.environ.get("url_post"), 
                json={"timestamp": int(tweet.timestamp_ms),
                 "tag": word, 
                 "location":tweet.user.location})
                # check status
                if r.status_code == 200:
                    print('ok data post')
                else:
                    print('data not posted')


    # @overide function on_error
    def on_error(self, status):
        print("Error detected")


  # create object tweepy
twitterAPI = TwitterAPI()  
tweets_listener = MyStreamListener(twitterAPI.getAPI())
stream = tweepy.Stream(twitterAPI.getAPI().auth, tweets_listener)
# filter the stream
stream.filter(track=os.environ.get("tracker"))



