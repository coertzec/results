from flask import Blueprint, render_template, abort
from jinja2 import TemplateNotFound
from server.database import db_session
from server.models import Event, Result, Participant
import random
import os 
from flask import jsonify
from pprint import pprint


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
        pprint(vars(event))
        dict_event = {}
        dict_event['title'] = event.title
        dict_event['date'] = event.date.strftime("%Y-%m-%d")
        dict_event['id']= event.id
        events.append(dict_event)

    return jsonify(events)

@api.route('/event_details/<event_id>')
def event_details(event_id): 
    event_info = {"categories" : [], "category_stages" : [], "event_stages" : []}
    event = db_session.query(Event).filter(Event.id==event_id).first()
    if (event.categories): 
        categories = {}
        for category in event.categories: 
            results = []
            db_category_results = db_session.query(Result).filter(Result.category_id==category.id)
            if (db_category_results):
                for result in db_category_results: 
                    category_result = compile_result(result)
                    results.append(category_result)      
            event_info["categories"].append({"category_name": category.name, "data": results})
            if (category.category_stages):
                for category_stage in category.category_stages: 
                    category_stage_results = []
                    db_category_stage_results = db_session.query(Result).filter(Result.category_stage_id==category_stage.id)
                    if (db_category_stage_results):
                        for result in db_category_stage_results: 
                            category_stage_result = compile_result(result)
                            category_stage_results.append(category_stage_result)      
                    event_info["category_stages"].append({"category_stage_name": category_stage.name, "data": category_stage_results})
    if(event.event_stages): 
        for event_stage in event.event_stages:
            results = []
            db_event_stage_results = db_session.query(Result).filter(Result.event_stage_id==event_stage.id)
            if (db_event_stage_results):
                for result in db_event_stage_results: 
                    event_stage_result = compile_result(result)
                    results.append(event_stage_result)      
            event_info["event_stages"].append({"event_stage_name": event_stage.name, "data": results})

            
    return jsonify(event_info)

def compile_result(result_set):
    result = {}
    result["position"] = result_set.position
    result["gender_position"] = result_set.gender_position
    result["time"] = result_set.time 
    db_category_participant = db_session.query(Participant).filter(Participant.id==result_set.participant_id).first()
    result["first_name"] = db_category_participant.first_name
    result["last_name"] = db_category_participant.last_name
    result["gender"] = db_category_participant.sex
    return result




    # event_info = {}
    # event_info['event_id'] = event.id
    # event_info['event_name'] = event.title

   
        