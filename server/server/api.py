from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound
#from server.models import Event
from server.database import db_session
from server.models import Event
import random
import os 
from flask import jsonify

# def readFile(filename):
#     filehandle = open(filename)
#     print (filehandle.read())
#     filehandle.close()

# print ("**********")
# cur_path = (os.path.dirname(__file__))
# nice_path = os.path.join(cur_path, '../../static/index.html')
# print(nice_path)
# readFile(nice_path)


api = Blueprint('api_blueprint', __name__)

@api.route('/',)
def index():
     try:
        return render_template("index.html")
     except TemplateNotFound:
         abort(404, "")

@api.route('/mtb_events')
def mtb_events(): 
    db_result =  db_session.query(Event).all()
    events = []
    for event in db_result: 
        dict_event = {}
        dict_event['title'] = event.title
        dict_event['date'] = event.date.strftime("%Y-%m-%d")
        events.append(dict_event)
        print(events)

    return jsonify(events)

