"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Client, Nutritionist
from api.utils import generate_sitemap, APIException

#create the flask app
api = Blueprint('api', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/client", methods=["POST"])
def signUp_client():
    name_request = request.json.get("name", None)
    email_request = request.json.get("email", None)
    password_request = request.json.get("password", None)
    description_request = request.json.get("description", None)

    new_client = Client(
        name= name_request,
        email= email_request,
        password= password_request,
        description= description_request
    )

    db.session.add(new_client)
    db.session.commit()

    return 'client added', 200