from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    

    def __repr__(self):
        return self.username

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
class Agendas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    agenda_name = db.Column(db.String(80), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship("User")
    contacts = db.relationship('Contacts',backref='agendas')
   
    def __repr__(self):
        return self.agenda_name

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "agenda_name":self.agenda_name
        }
class Contacts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    address = db.Column(db.String(240), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique = True, nullable = False)
    agendas_id = db.Column(db.Integer, db.ForeignKey('agendas.id'), nullable=False)

    def __repr__(self):
        return self.full_name

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            "address": self.address,
            "phone":self.phone,
            "agendas_id": self.agendas_id
        }