import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../layout";

export const AddContact = () => {
	const { myGetFetch, userInput, setUserInput } = useContext(AppContext)



	let newArr =
	{
		"full_name": '',
		"email": '',
		"agenda_slug": "Leos",
		"address": '',
		"phone": ''
	}




	const makeNewContact = () => {
		setUserInput(newArr)

		fetch('https://playground.4geeks.com/apis/fake/contact/', {
			method: 'POST',
			body: JSON.stringify(newArr), // data can be a 'string' or an {object} which comes from somewhere further above in our application
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => res.json())
			.then(data => myGetFetch());

	}


	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input type="text" className="form-control" placeholder="Full Name" onKeyUp={(e) => {newArr['full_name'] = e.target.value }} />
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" className="form-control" placeholder="Enter email" onKeyUp={(e) => {newArr['email'] = e.target.value }} />
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="phone" className="form-control" placeholder="Enter phone" onKeyUp={(e) => {newArr['phone'] = e.target.value }} />
					</div>
					<div className="form-group">
						<label>Address</label>
						<input type="text" className="form-control" placeholder="Enter address" onKeyUp={(e) => {newArr['address'] = e.target.value }} />
					</div>

					<Link className="mt-3 w-100 text-center" to="/contacts">
						<button type="button" className="btn btn-primary form-control" onClick={() => { makeNewContact() }}>
							Save
						</button>
					</Link>

					<Link className="mt-3 w-100 text-center" to="/contacts">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};