"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Client, Nutritionist, Session
from api.utils import generate_sitemap, APIException

#create the flask app
api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    client = Client.query.filter_by(client_email=email, password=password).first()
    nutritionist = Nutritionist.query.filter_by(nutritionist_email=email, password=password).first()

    if client is None:
        professional= nutritionist.professional
        id= nutritionist.id
    else:
        professional= client.professional
        id= client.id
        
    if client is None and nutritionist is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token, professional=professional, id=id)

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/token", methods=["GET"])
@jwt_required()
def protected():
    current_user_email = get_jwt_identity()
    client = Client.query.filter_by(client_email=current_user_email).first()
    nutritionist = Nutritionist.query.filter_by(nutritionist_email=current_user_email).first()
    
    if client is None and nutritionist is None:
        return jsonify({"msg": "Bad username or password"}), 401

    if client is None:
        professional= nutritionist.professional
        id= nutritionist.id
    else:
        professional= client.professional
        id= client.id
    
    return jsonify(logged_in_as=current_user_email, professional=professional, id=id), 200


@api.route("/client", methods=["POST"])
def signUp_client():
    first_name_request = request.json.get("first_name", None)
    last_name_request = request.json.get("last_name", None)
    email_request = request.json.get("email", None)
    password_request = request.json.get("password", None)
    professional_request = request.json.get("professional", None)
    days_request = request.json.get("days", None)
    times_request = request.json.get("times", None)
    description_request = request.json.get("description", None)

    new_client = Client(
        first_name= first_name_request,
        last_name= last_name_request,
        client_email= email_request,
        password= password_request,
        professional= professional_request,
        days= days_request,
        times= times_request,
        description= description_request
    )

    db.session.add(new_client)
    db.session.commit()

    return 'client added', 200


@api.route("/client/<int:client_id>", methods=["PUT"])
def update_client(client_id):
    
    request_body_client = request.get_json()
    client1 = Client.query.get(client_id)
    if client1 is None:
        return 'Client not found', 404

    if "first_name" in request_body_client:
        client1.first_name =  request_body_client["first_name"]
    if "last_name" in request_body_client:
        client1.last_name =  request_body_client["last_name"]
    if "client_email" in request_body_client:
        client1.client_email =  request_body_client["client_email"]
    if "password" in request_body_client:
        client1.password =  request_body_client["password"]
    if "description" in request_body_client:
        client1.description =  request_body_client["description"]
    db.session.commit()

    return 'client updated', 200


@api.route("/client/<int:client_id>", methods=["GET"])
def get_a_client(client_id):

   get_body_client= Client.query.get(client_id)

   return jsonify({'test': [get_body_client.serialize()]}), 200


@api.route("/client/<int:client_id>", methods=["DELETE"])
def delete_a_client(client_id):
    
    client_to_delete= Client.query.get(client_id)

    if client_to_delete is None:
        return 'client not found', 404

    db.session.delete(client_to_delete)
    db.session.commit()
    
    return 'client deleted', 200


@api.route("/nutritionist", methods=["POST"])
def signUp_nutritionist():
    first_name_request = request.json.get("first_name", None)
    last_name_request = request.json.get("last_name", None)
    email_request = request.json.get("email", None)
    password_request = request.json.get("password", None)
    professional_request= request.json.get("professional", None)
    days_request = request.json.get("days", None)
    times_request = request.json.get("times", None)
    description_request = request.json.get("description", None)

    new_nutritionist = Nutritionist(
        first_name= first_name_request,
        last_name= last_name_request,
        nutritionist_email= email_request,
        password= password_request,
        professional= professional_request,
        days= days_request,
        times= times_request,
        description= description_request
    )

    db.session.add(new_nutritionist)
    db.session.commit()

    return 'nutritionist added', 200


@api.route("/nutritionist/<int:nutritionist_id>", methods=["PUT"])
def modify_nutritionist(nutritionist_id):
    
    request_body_nutritionist= request.get_json()

    nutritionist_mod= Nutritionist.query.get(nutritionist_id)
    if nutritionist_mod is None:
        return 'Nutritionist not found', 404
    
    if "first_name" in request_body_nutritionist:
        nutritionist_mod.first_name= request_body_nutritionist["first_name"]
    if "last_name" in request_body_nutritionist:
        nutritionist_mod.last_name= request_body_nutritionist["last_name"]
    if "nutritionist_email" in request_body_nutritionist:
        nutritionist_mod.nutritionist_email= request_body_nutritionist["nutritionist_email"]
    if "password" in request_body_nutritionist:
        nutritionist_mod.password= request_body_nutritionist["password"]
    if "professional" in request_body_nutritionist:
        nutritionist_mod.professional= request_body_nutritionist["professional"]
    if "days" in request_body_nutritionist:
        nutritionist_mod.days= request_body_nutritionist["days"]
    if "times" in request_body_nutritionist:
        nutritionist_mod.times= request_body_nutritionist["times"]
    if "description" in request_body_nutritionist:
        nutritionist_mod.description= request_body_nutritionist["description"]

    db.session.commit()

    return 'nutritionist added', 200


@api.route("/nutritionist/", methods=["GET"])
def get_nutri():
    get_body_nutri= Nutritionist.query.all()

    response_body = {
        'get_body_nutri': []
    }
    for nutri in get_body_nutri:
        response_body['get_body_nutri'].append(nutri.serialize())

    return jsonify(response_body), 200


@api.route("/nutritionist/<int:nutritionist_id>", methods=["GET"])
def get_nutritionist(nutritionist_id):

    get_body_nutritionist= Nutritionist.query.get(nutritionist_id)


    return jsonify({'test': [get_body_nutritionist.serialize()]}), 200


@api.route("/nutritionist/<int:nutritionist_id>", methods=["DELETE"])
def delete_a_nutritionist(nutritionist_id):

    nutritionist_to_delete= Nutritionist.query.get(nutritionist_id)

    if nutritionist_to_delete is None:
        return 'nutritionist not found', 404
    db.session.delete(nutritionist_to_delete)
    db.session.commit()
    
    return 'nutritionist deleted', 200
    

@api.route("/session", methods=["POST"])
def make_an_appointmen():

    id_request = request.json.get("id", None)
    id_client_request = request.json.get("id_client", None)
    id_nutritionist_request = request.json.get("id_nutritionist", None)
    name_client_request = request.json.get("name_client", None)
    name_nutritionist_request = request.json.get("name_nutritionist", None)
    date_request = request.json.get("date", None)
    time_request = request.json.get("time", None)

    client = Client.query.filter_by(id=id_nutritionist_request).first()
    nutritionist = Nutritionist.query.filter_by(id=id_nutritionist_request).first()

    new_session = Session(
        id= id_request,
        id_client= id_client_request,
        id_nutritionist= id_nutritionist_request,
        name_client= name_client_request,
        name_nutritionist= name_nutritionist_request,
        date= date_request,
        time= time_request
    )

    db.session.add(new_session)
    db.session.commit()

    return 'session added', 200


@api.route("/session/<int:session_id>", methods=["PUT"])
def update_an_appointmen(session_id):

    request_body_session = request.get_json()
    session = Session.query.get(session_id)

    if session is None:
        raise APIExeption('session not found', status_code=404)  

    if "id" in request_body_session:
        session.id = request_body_session["id"]
    if "id_client" in request_body_session:
        session.id_client = request_body_session["id_client"]
    if "id_nutritionist" in request_body_session:
        session.id_nutritionist = request_body_session["id_nutritionist"]
    if "date" in request_body_session:
        session.date = request_body_session["date"]
    if "time" in request_body_session:
        session.time = request_body_session["time"]
    db.session.commit()

    return 'session updated', 200


@api.route("/session/<int:session_id>", methods=["DELETE"])
def delete_an_appointmen(session_id):

    session_to_delete= Session.query.get(session_id)

    if session_to_delete is None:
        return 'session not found', 404

    db.session.delete(session_to_delete)
    db.session.commit()
    
    return 'session deleted', 200


@api.route("/session/<int:session_id>", methods=["GET"])
def get_session(session_id):

    get_body_session= Session.query.get(session_id)


    return jsonify({'session': [get_body_session.serialize()]}), 200


@api.route("/session", methods=["GET"])
@jwt_required()
def get_sessions():
    current_user_email = get_jwt_identity()
    client = Client.query.filter_by(client_email=current_user_email).first()
    nutritionist = Nutritionist.query.filter_by(nutritionist_email=current_user_email).first()
    
    if client is None and nutritionist is None:
        return jsonify({"msg": "No sessions stored"}), 401

    if client is None:
        first_name= nutritionist.first_name
        last_name = nutritionist.last_name
        name= first_name + " " + last_name
        id= nutritionist.id
        get_body_session= Session.query.filter_by(id_nutritionist=id).all()

    if nutritionist is None:
        first_name= client.first_name
        last_name = client.last_name
        name= first_name + " " + last_name
        id= client.id
        get_body_session= Session.query.filter_by(id_client=id).all()

    response_body = {
        'get_body_session': []
    }

    for session in get_body_session:
        response_body['get_body_session'].append(session.serialize())

    return jsonify(response_body=response_body, name=name), 200