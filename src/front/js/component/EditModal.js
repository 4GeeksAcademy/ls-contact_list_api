import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { AppContext } from "../layout";



export const EditModal = props => {

	const { myGetFetch, userInput, setUserInput,currentContact,setCurrentContact } = useContext(AppContext)

	const [name, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [address, setAddress] = useState('')
	const [phone, setPhone] = useState('')

	useEffect(()=>{
		setFullName(currentContact.full_name);
		setEmail(currentContact.email);
		setAddress(currentContact.address);
		setPhone(currentContact.phone)
	},
	[currentContact])

	const editFetch = (id) => {


		fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
			method: 'PUT',
			body: JSON.stringify(
				{
					"full_name": name,
					"email": email,
					"agenda_slug": "Leos",
					"address": address,
					"phone": phone
				}
			), // data can be a 'string' or an {object} which comes from somewhere further above in our application
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => myGetFetch());
	}



	const editContact = (id, closeModalFx) => {
		editFetch(id);;
		closeModalFx({ showModal: false });
	}


	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Edit{ }</h5>
						{props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)}
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label>Full Name</label>
								<input type="text" className="form-control" id="name" value={name} onChange={(e) => { setFullName(e.target.value) }} />
							</div>
							<div className="form-group">
								<label>Email</label>
								<input type="email" className="form-control" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
							</div>
							<div className="form-group">
								<label>Phone</label>
								<input type="phone" className="form-control" id="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
							</div>
							<div className="form-group">
								<label>Address</label>
								<input type="text" className="form-control" id="address" value={address} onChange={(e) => { setAddress(e.target.value) }} />
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger" onClick={() => props.onClose({ showModal: false })}>
							Oh no!
						</button>
						<button type="button" className="btn btn-success" onClick={() => { editContact(currentContact.id, props.onClose) }} data-dismiss="modal">
							Do it!
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
EditModal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
 **/
EditModal.defaultProps = {
	show: false,
	onClose: null
};