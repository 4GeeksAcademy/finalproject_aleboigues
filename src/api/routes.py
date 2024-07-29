"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Character, Favorite
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
                #id=char.get("id"),
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


# Ruta para obtener todos los personajes (GET)
@api.route('/characters', methods=['GET'])
def get_characters():
    try:
        characters = Character.query.all()
        return jsonify([char.serialize() for char in characters]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Ruta para crear un nuevo personaje (POST)
@api.route('/characters', methods=['POST'])
def create_character():
    data = request.json
    new_character = Character(
        name=data["name"],
        image=data["image"],
        species=data["species"],
        status=data["status"],
        gender=data["gender"],
    )
    character_query=Character.query.filter_by(name=data["name"]).first()
    if character_query is None:
        db.session.add(new_character)
        db.session.commit()
        return jsonify(new_character.serialize()), 201
    else:
        return jsonify({"msg": "personaje ya existente"}), 404
    

# Ruta para eliminar un personaje (DELETE)
@api.route('/characters/<int:id>', methods=['DELETE'])
def delete_character(id):
    character = Character.query.get(id)
    if not character:
        return jsonify({"error": "Personaje no encontrado"}), 404
    
    try:
        db.session.delete(character)
        db.session.commit()
        return jsonify({'message': 'Personaje eliminado'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500



# Ruta para obtener un personaje por ID (GET)
@api.route('/characters/<int:id>', methods=['GET'])
def get_character(id):
    character = Character.query.get(id)
    if character:
        return jsonify(character.serialize()), 200
    else:
        return jsonify({"error": "Personaje no encontrado"}), 404



# Ruta para actualizar un personaje (PUT)
@api.route('/characters/<int:id>', methods=['PUT'])
def update_character(id):
    character = Character.query.get(id)
    if not character:
        return jsonify({"error": "Personaje no encontrado"}), 404
    
    data = request.get_json()
    character.name = data.get("name", character.name)
    character.image = data.get("image", character.image)
    character.species = data.get("species", character.species)
    character.status = data.get("status", character.status)
    character.gender = data.get("gender", character.gender)

    try:
        db.session.commit()
        return jsonify(character.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# RUTA DE INICIO DE SESIÓN
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'message': "email incorrecto"}), 401
    if password != user.password:
        return jsonify({'message': "contraseña incorrecta"}), 401
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# RUTA DE REGISTRO
@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()
    if user is None: 
        user = User(email=body["email"], password=body["password"], is_active=True)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': "usuario creado"}), 200
    else:
        return jsonify({'message': "usuario ya existe"}), 401


@api.route('/favorites/<int:user_id>', methods=['GET'])
def get_favorites(user_id):
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': fav.id, 'item_id': fav.item_id} for fav in favorites])

@api.route('/addfavorite', methods=['POST'])
def add_favorite():
    user_id = request.json.get("user_id")
    character_id = request.json.get("character_id")

    if not user_id or not character_id:
       return jsonify({"message": "Usuario o personaje no encontrado"}), 400

    user = User.query.get(user_id)
    character = Character.query.get(character_id)

    if not user or not character:
        return jsonify({"message": "usuario o personaje no encontrado"}), 404
    
    new_favorite = Favorite(user_id=user_id, item_id=character_id)

    try:
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({"message": "favorito añadido correctamente"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"ocurrió un error: {e}"}), 500


@api.route('/favorites/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    favorite = Favorite.query.get(id)
    if not favorite:
        return jsonify({"message": "Favorito no encontrado"}), 404
    
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorito eliminado'})

if __name__ == '__main__':
    app.run(debug=True)
