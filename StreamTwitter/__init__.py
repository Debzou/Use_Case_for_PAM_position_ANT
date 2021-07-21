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
        
        # post location
        if tweet.coordinates != None:
            print(tweet.coordinates['coordinates'])
            # post location
            response = requests.post(os.environ.get("url_post_location"),json={'location':str(tweet.coordinates['coordinates'])})
            if response.status_code !=200:
                print('Error post')
        # post tweet relevant
        if hasattr(tweet, 'retweeted_status') :
            wordList = tweet.retweeted_status.text.split(' ')
            hastageList = []
            # filter tweet
            # only RT > 20000 retweet
            if tweet.retweeted_status.retweet_count>1000:
                for word in wordList:
                    # find the '#'
                    if  re.search("^#.*", word):
                        # add '#' to the list
                        hastageList.append(word)
                if hastageList != []:
                    # post data
                    response = requests.post(os.environ.get("url_post_tweet"), 
                        json={
                        'name':tweet.retweeted_status.user.name,
                        'timestamp': int(tweet.timestamp_ms),
                        'hastageList': hastageList, 
                        'text':tweet.retweeted_status.text,
                        'retweet_count':tweet.retweeted_status.retweet_count,
                        'favorite_count':tweet.retweeted_status.favorite_count
                        })
                    print(tweet.retweeted_status.user.name)
                    if(response.status_code !=200):
                        print('Error post')
                  

    # @overide function on_error
    def on_error(self, status):
        print("Error detected")


  # create object tweepy
twitterAPI = TwitterAPI()  
tweets_listener = MyStreamListener(twitterAPI.getAPI())
stream = tweepy.Stream(twitterAPI.getAPI().auth, tweets_listener)
# filter the stream
stream.filter(track=os.environ.get("tracker"),languages=["en","fr"])



