import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/ContactCard";
import { Modal } from "../component/Modal";
import { AppContext } from "../layout";
import { EditModal } from "../component/EditModal";



export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		id: 0
	});
	const [editState, setEditState] = useState({
		showModal: false,
		contact: {

			address: "",
			agenda_id: currentAgenda,
			email
				:
				"",
			full_name
				:
				"",
			phone
				: ""

		}
	});
	const { contacts, setContacts, myGetFetch, currentAgenda, setCurrentContact, userInput } = useContext(AppContext);
	useEffect(() => {
		fetch(`https://scaling-space-acorn-977rjvgv76wxcpvp9-3001.app.github.dev/api/${currentAgenda}/contacts`)
			.then(response => {
				let contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					return response.json();
				}
				throw new TypeError("Sorry, There's no JSON here!");
			})
			.then(jsonifiedResponse => {
				setContacts(jsonifiedResponse.data)
			})
			.catch(error => console.log(error));
	}, [currentAgenda, userInput]);



	return (


		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/addcontact">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{contacts.map((contact, index) =>
							<ContactCard key={index}
								contact={contact}
								onDelete={() => setState({ showModal: true, id: contact.id })}
								onEdit={() => setEditState({ showModal: true, contact: contact })}
							/>
							,
						)}

					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={state.id} onClose={() => setState({ showModal: false })} />

			<EditModal show={editState.showModal}
				onClose={() => setEditState({ ...editState, showModal: false })} />
		</div>
	);
};