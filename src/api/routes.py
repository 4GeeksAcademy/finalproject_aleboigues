"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# RUTA DE INICIO DE SESIÓN

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if user:
        return jsonify({'message': 'Login successful', 'user': {'id': user.id, 'username': user.username}})
    return jsonify({'message': 'Invalid credentials'}), 401

@api.route('/favorites/<int:user_id>', methods=['GET'])
def get_favorites(user_id):
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': fav.id, 'item_id': fav.item_id, 'item_type': fav.item_type} for fav in favorites])

@api.route('/favorites', methods=['POST'])
def add_favorite():
    data = request.json
    new_favorite = Favorite(user_id=data['user_id'], item_id=data['item_id'], item_type=data['item_type'])
    db.session.add(new_favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite added successfully'})

@api.route('/favorites/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    favorite = Favorite.query.get(id)
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)