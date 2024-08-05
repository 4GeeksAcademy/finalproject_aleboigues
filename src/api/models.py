from flask_sqlalchemy import SQLAlchemy

# Inicializa la instancia de SQLAlchemy
db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'  # Nombre de la tabla
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)  # La contraseña no necesita ser única
    is_active = db.Column(db.Boolean(), default=True, nullable=False)  # Por defecto activo

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        """Método para serializar el objeto User."""
        return {
            "id": self.id,
            "email": self.email,
        }

class Favorite(db.Model):
    __tablename__ = 'favorite'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('character.id'), nullable=False)

    user = db.relationship('User', backref=db.backref('favorites', lazy=True))

    character = db.relationship('Character', backref=db.backref('favorites', lazy=True))

    def __repr__(self):
        return f'<Favorite user_id={self.user_id} item_id={self.item_id}>'

    def serialize(self):
        """Método para serializar el objeto Favorite."""
        return {
            'id': self.id,
            'user': self.user.serialize(),  
            'character': self.character.serialize()  
        }

class Character(db.Model):
    __tablename__ = 'character'  # Nombre de la tabla
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(250), nullable=False)
    species = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(80), nullable=False)
    gender = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return f'<Character {self.name}>'

    def serialize(self):
        """Método para serializar el objeto Character."""
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "species": self.species,
            "status": self.status,
            "gender": self.gender,
        }
