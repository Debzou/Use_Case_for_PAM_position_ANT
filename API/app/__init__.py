################################
#       Importing Library      #
################################
from flask import Flask

################################
#          Define API          #
################################
app = Flask(__name__)

# import routes & controllers
from app import index
from app import tweet
from app import locationTweet