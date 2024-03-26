import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/ContactCard";
import { Modal } from "../component/Modal";
import { AppContext } from "../layout";
import { EditModal } from "../component/EditModal";
import { Agendacard } from "../component/AgendaCard";




export const Agenda = () => {
    const { currentUser } = useContext(AppContext)
    const [agenda, setAgenda] = useState([])
    const [editState, setEditState] = useState({
        showModal: false,
        contact: {
        }
    });

    useEffect(() => {
        fetch(`https://scaling-space-acorn-977rjvgv76wxcpvp9-3001.app.github.dev/api/${currentUser.data[0].id}/agendas`)
            .then(response => {
                let contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    return response.json();
                }
                throw new TypeError("Sorry, There's no JSON here!");
            })
            .then(jsonifiedResponse => {
                setAgenda(jsonifiedResponse.data)
            })
            .catch(error => console.log(error));
    }, [currentUser]);


    return (
        <div className="container">
            <div>
                <p className="text-right my-3">
                    <Link className="btn btn-success" to="/addcontact">
                        Add new contact
                    </Link>
                </p>

                <div>{currentUser.good_message}</div>
                <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                    <ul className="list-group pull-down" id="contact-list">
                        {agenda.map((agenda, index) =>
                            <Agendacard key={index}
                                agenda={agenda}
                            // onDelete={() => setState({ showModal: true, id: contact.id })}
                            // onEdit={() => setEditState({ showModal: true, contact: contact })}
                            />
                            ,
                        )}


                    </ul>
                </div>
            </div>

            {/* <Modal show={state.showModal} id={state.id} onClose={() => setState({ showModal: false })} /> */}

            {/* <EditModal show={editState.showModal}
                onClose={() => setEditState({ ...editState, showModal: false })} /> */}
        </div>
    );
};