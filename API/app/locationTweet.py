from app import app
from MongoDB import *
from JsonSerializable import *
from flask import request
from flask import jsonify

@app.route("/location",methods=['POST','GET'])
def location():
    if request.method == 'POST':
        # get information
        location = request.json['location']
        # insert in collection
        location_collection.insert({'location': location})
        return jsonify({'result' : 'done'})
    else:
        output = []
        for element in location_collection.find({}):
            # add element (but object id must be serialized)
            output.append(json.dumps(element, cls=JSONEncoder))
        # send result
        return jsonify({'result' : output})