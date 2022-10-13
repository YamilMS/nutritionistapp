from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name= db.Column(db.String(120), unique=False, nullable=False)
    last_name= db.Column(db.String(120), unique=False, nullable=False)
    client_email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    description= db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Client {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Nutritionist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name= db.Column(db.String(120), unique=False, nullable=False)
    last_name= db.Column(db.String(120), unique=False, nullable=False)
    nutritionist_email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    description= db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Nutritionist {self.nutritionist_email}>'

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "nutritionist_email": self.nutritionist_email,
            "description": self.description

            # do not serialize the password, its a security breach
        }

class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_client = db.Column(db.Integer, unique=False, nullable=False)
    id_nutritionist = db.Column(db.Integer, unique=False, nullable=False)
    date= db.Column(db.String(100), unique=False, nullable=False)
    recomendation= db.Column(db.String(500), unique=False, nullable=False)

    def __repr__(self):
        return f'<Session {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "date": self.date,
            # do not serialize the password, its a security breach
        }