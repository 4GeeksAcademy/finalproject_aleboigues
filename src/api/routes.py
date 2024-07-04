"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Ruta que nos trae los datos de la API
@api.route('/apiexterna', methods=['POST'])
def apiexterna():
    urls = [
        "https://rickandmortyapi.com/api/character/?page=1",
        "https://rickandmortyapi.com/api/character/?page=2",
        "https://rickandmortyapi.com/api/character/?page=3",
        "https://rickandmortyapi.com/api/character/?page=4",
        "https://rickandmortyapi.com/api/character/?page=5",
        "https://rickandmortyapi.com/api/character/?page=6",
    ]
    stored_characters = []
    errors = []

    for url in urls:
        response = requests.get(url)

        if response.status_code != 200:
            return jsonify({"error": "fallo con la api externa"}), 500

        data = response.json()
        characters = data.get("results", [])

        for char in characters:
            existing_character = Character.query.filter_by(name=char.get("name")).first()
            if existing_character:
                continue

            new_character = Character(
                id=char.get("id"),
                name=char.get("name"),
                image=char.get("image"),
                species=char.get("species"),
                status=char.get("status"),
                gender=char.get("gender"),
            )

            try:
                db.session.add(new_character)
                stored_characters.append(new_character)
            except Exception as e:
                db.session.rollback()
                errors.append(str(e))

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        errors.append(str(e))

    return jsonify({
        "stored_characters": [char.serialize() for char in stored_characters],
        "errors": errors
    }), 201



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