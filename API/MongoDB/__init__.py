################################
#       Importing Library      #
################################
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()
import os

# start mongoDB
clientMongo = MongoClient(os.environ.get("url_mongodb"))
# get database
database_tweet = clientMongo.database_tweet
# get collection
hashtag_collection = database_tweet.hashtag_collection
location_collection = database_tweet.location_collection
