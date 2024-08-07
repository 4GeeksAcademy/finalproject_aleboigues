"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Character, Favorite
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
import requests

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Ruta que nos trae los datos de la API externa
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
            return jsonify({"error": "Error con la API externa"}), 500

        data = response.json()
        characters = data.get("results", [])

        for char in characters:
            existing_character = Character.query.filter_by(name=char.get("name")).first()
            if existing_character:
                continue

            new_character = Character(
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

# Ruta para eliminar un personaje (DELETE)
@api.route('/characters/<int:id>', methods=['DELETE'])
@jwt_required()
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
@jwt_required()
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

# Ruta de inicio de sesión
@api.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'message': "Email incorrecto"}), 401
    if password != user.password:
        return jsonify({'message': "Contraseña incorrecta"}), 401

    access_token = create_access_token(identity=user.id)  # Incluye el user_id en el token JWT
    return jsonify(access_token=access_token)

# Ruta de registro
@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        user = User(email=body["email"], password=body["password"], is_active=True)
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': "Usuario creado"}), 200
    else:
        return jsonify({'message': "El usuario ya existe"}), 400

# Ruta para obtener favoritos
@api.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity() 
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    return jsonify([{'id': fav.id, 'item_id': fav.item_id} for fav in favorites]), 200

# Ruta para añadir a favoritos
@api.route('/addfavorite', methods=['POST'])
@jwt_required()
def add_favorite():
    user_id = get_jwt_identity() 
    data = request.get_json()
    item_id = data.get('item_id')  

    character = Character.query.get(item_id)
    if not character:
        return jsonify({"message": "Personaje no encontrado"}), 404

    existing_favorite = Favorite.query.filter_by(user_id=user_id, item_id=item_id).first()
    if existing_favorite:
        return jsonify({"message": "El personaje ya está en tus favoritos"}), 400

    new_favorite = Favorite(user_id=user_id, item_id=item_id)
    db.session.add(new_favorite)

    try:
        db.session.commit()
        return jsonify({"message": "Personaje añadido a favoritos"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Ruta para eliminar un favorito
@api.route('/favorites/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_favorite(id):
    favorite = Favorite.query.get(id)
    if not favorite:
        return jsonify({"message": "Favorito no encontrado"}), 404

    try:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Favorito eliminado'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
