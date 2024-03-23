"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User,Agendas,Contacts
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


# GET USER

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#USER
# Get User With Verfication
@api.route('/getuser', methods=['POST'])
def get_user():
    request_body=request.json
    user_account = User.query.filter_by(username=request_body['username']).filter_by(password=request_body['password'])
    result = list(map(lambda x: x.serialize(),user_account))
    if result:
    #    data_back= single_user.serialize() 
        response_body = {
        "message": f"Welcome {result[0]['username']}",
        "data": result
        }
    else:
        check_if_exist = User.query.filter_by(username=request_body['username'])
        check_if_exist_result = list(map(lambda x: x.serialize(),check_if_exist))
        if check_if_exist_result:
            response_body = {
            "message": "Wrong username or password"
            }
        else:
            response_body = {
            "message": "You don't have account please make a new account"
            }

    return jsonify(response_body), 200

#Post User
@api.route('/newuser', methods=['POST'])
def post_new_user():
    request.body = request.json
    new_user = User(username=request.body['username'],password=request.body['password'],email=request.body['email'])
    check_username=User.query.filter_by(username=request.body['username'])
    
    if check_username.first(): 
        response_body = {
            "message": "This User Already Excist"
        }    
    else:
        db.session.add(new_user)
        db.session.commit()
        response_body = {
            "message": "User Created"
        }
    return jsonify(response_body), 200

#AGENDA

#Get All Agendas for ONE USER
@api.route('/<int:user_id_in>/agendas', methods=['GET'])
def get_agendas_for_one_user(user_id_in):
    user_agendas_query = Agendas.query.filter_by(user_id=user_id_in)
    user_agendas=list(map(lambda x:x.serialize(),user_agendas_query))
    if user_agendas:
        response_body = {
        "message": "Welcome to your Contacts List",
        "data":user_agendas
        }
    else:
        response_body = {
        "message": "Make an Agenda to start adding contacts"
        }  
    return jsonify(response_body)


#Post Agenda
@api.route('/newagenda',methods=['POST'])
def post_new_agenda():
    request_body=request.json
    check_excisting_agenda= Agendas.query.filter_by(user_id=request_body['user_id']).filter_by(agenda_name=request_body['agenda_name'])
    if check_excisting_agenda.first():
        response_body = {
            "message": f"You already have an Agenda with the name {request_body['agenda_name']}!"
        }
    else:
        add_new_agenda=Agendas(user_id=request_body['user_id'],agenda_name=request_body['agenda_name'])
        db.session.add(add_new_agenda)
        db.session.commit()
        response_body = {
            "message": f"The New Agenda {request_body['agenda_name']} You can start adding contacts!"
        }  
    return jsonify(response_body)

#Delete Agenda #Return Updated Agenda
@api.route('/delete/agenda', methods=['POST'])
def delete_agenda():
    request_body=request.json
    delete_agenda= Agendas.query.get(request_body['agenda_id'])
    if delete_agenda:    
        delete_contacts= Contacts.query.filter_by(agendas_id = request_body['agenda_id'])
        if delete_contacts.first():
           for contact in delete_contacts:
            db.session.delete(contact)
            db.session.commit()          
        db.session.delete(delete_agenda)
        db.session.commit()
        q_updated_agendas=Agendas.query.all()
        updated_agendas=list(map(lambda x:x.serialize(), q_updated_agendas))
        if updated_agendas:
            response_body = {
                # "message": f"{request_body['agenda_name']} has been deleted!",
                "data": updated_agendas
            }
        else:
            response_body = {
                # "message": f"{delete_agenda['agenda_name']} has been deleted!",
                "data": "Add Agenda to add Contacts"
            }
    else:
        response_body = {
            "message": f"{request_body['agenda_name']} is not an agenda"
        }  
    return jsonify(response_body)
#Put Agenda
@api.route('/editagenda',methods=['PUT'])
def put_new_agenda():   
    request.body = request.json  
    edited_agenda = Agendas.query.get(request.body['agenda_id'])
    existing_agenda_name = Agendas.query.filter_by(agenda_name = request.body['agenda_name']).first()
    if edited_agenda:
        if existing_agenda_name:  
            response_body={
                "message": f"{request.body['agenda_name']} exsist please choose a diffrent usename"
            } 
        else:
           edited_agenda.agenda_name = request.body['agenda_name']
           db.session.commit()
           response_body={
                "message": f"{request.body['agenda_name']} was updated to {edited_agenda.agenda_name}"
            }     
    else:
         response_body={
                "message": f"{response_body['agenda_name']}doesn't excist"
            }
    return jsonify(response_body)
##CONTACTS
#Get Contacts
@api.route('/<int:agenda_id>/contacts', methods=['GET'])
def get_contact_from_agenda(agenda_id):
    q_agenda_contact= Contacts.query.filter_by(agendas_id=agenda_id).all()
    if q_agenda_contact:
        agenda_contact = list(map(lambda x: x.serialize(),q_agenda_contact))
        response_body={
            "data":agenda_contact
        }
    else:
        response_body={
            "message": f"No contact in this agenda"
        }    
    return jsonify(response_body)    
#Post Contacts
@api.route('/newcontact',methods=['POST'])
def post_new_contact():
    request_body=request.json
    q_check_email = Contacts.query.filter_by(email=request_body['email'])
    if q_check_email:
        response_body={
            "message":f"Email Taken"
        }
        return jsonify(response_body)
    q_check_phone = Contacts.query.filter_by(phone=request_body['phone'])
    if q_check_phone: 
        response_body={
            "message":f"Phone Taken"
        }
        return jsonify(response_body)
    new_contact= Contacts(full_name=request_body['full_name'],
                                     email=request_body['email'],
                                     address=request_body['address'],
                                     phone=request_body['phone'],
                                     agendas_id=request_body['agendas_id'])
    
    if new_contact:
        db.session.add(new_contact)
        db.session.commit()
        q_contacts_agenda = Contacts.query.filter_by(agendas_id=request.json['agendas_id'])
        contacts_agendas = list(map(lambda x: x.serialize(), q_contacts_agenda))
        response_body = {
            "message": f"Contact added {new_contact.full_name}",
            "data": contacts_agendas
        }
    else:
        response_body = {
            "message": f"Contact with phone or email exist"
        }  
    return jsonify(response_body)

#PUT Contacts
@api.route('/editcontact',methods=['PUT'])
def put_contact():   
    request_body = request.json
    existing_email_contact = Contacts.query.filter(Contacts.id != request_body['contact_id'], Contacts.email == request_body['email']).first()
    existing_phone_contact = Contacts.query.filter(Contacts.id != request_body['contact_id'], Contacts.phone == request_body['phone']).first()

    if existing_email_contact:
        return jsonify({'message': 'Email is already in use by another contact'}), 400

    if existing_phone_contact:
        return jsonify({'message': 'Phone number is already in use by another contact'}), 400

    contact_to_edit = Contacts.query.get(request_body['contact_id'])
    if contact_to_edit:
        for key, value in request_body.items():
            setattr(contact_to_edit, key, value)
        db.session.commit()
        response_body={
            "message":f"{request_body['full_name']} has been updated"
        }
    return jsonify(response_body) 
