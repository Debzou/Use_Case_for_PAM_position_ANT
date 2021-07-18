from app import app
from MongoDB import *
from JsonSerializable import *
from flask import request
from flask import jsonify
from datetime import datetime, timedelta


@app.route("/hastage",methods=['POST'])
def post_hashtag():
    # get information
    timestamp = request.json['timestamp']
    tag = request.json['tag']
    location=request.json['location']
    # insert in collection
    hashtag_collection.insert({'timestamp': timestamp, 'tag': tag, 'location':location})
    return jsonify({'result' : 'done'})


@app.route("/hastage/<GRANULARITY>",methods=['GET'])
def get_hashtag(GRANULARITY):
    # get date NOW
    dateNow = datetime.now()
    output = []
    # check granularity
    if GRANULARITY == 'minutes':
         # timestamp - 1 minutes
        timestamp = datetime.timestamp(dateNow - timedelta(minutes= 2)) * 1000
       
        # request each element with time > at timestamp
        for element in hashtag_collection.find( {"timestamp": {"$gt": int(timestamp)}}):
            # add element (but object id must be serialized)
            output.append(json.dumps(element, cls=JSONEncoder))
        # send result
        return jsonify({'result' : output})

    elif GRANULARITY == 'hours':
         # timestamp - 1 hours
        timestamp = datetime.timestamp(dateNow - timedelta(hours= 1)) * 1000
      
        # request each element with time > at timestamp
        for element in hashtag_collection.find( {"timestamp": {"$gt": int(timestamp)}}):
            # add element (but object id must be serialized)
            output.append(json.dumps(element, cls=JSONEncoder))
        # send result
        return jsonify({'result' : output})

    elif GRANULARITY == 'months': 
        # timestamp - 1 month
        timestamp = datetime.timestamp(dateNow - timedelta(hours= 31*24*60)) * 1000
       
        # request each element with time > at timestamp
        for element in hashtag_collection.find( {"timestamp": {"$gt": int(timestamp)}}):
            # add element (but object id must be serialized)
            output.append(json.dumps(element, cls=JSONEncoder))
        # send result
        return jsonify({'result' : output})

    else:
        return jsonify({'bad syntax' : 'GRANULARITY is only : [minutes , hours , months]'})
