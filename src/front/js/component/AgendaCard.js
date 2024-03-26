import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import MikePhoto from "../../img/m101.jpg";
import { AppContext } from "../layout";
import { Link } from "react-router-dom";



export const Agendacard = props => {

    const { currentAgendas, setCurrentAgenda, myGetFetch, setCurrentContact } = useContext(AppContext);
  

    return (
        <>
            <li className="list-group-item">
                <div className="row w-100">
                    <div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
                        <label className="name lead">Agenda Name: {props.agenda.agenda_name}</label>
                        <br />
                        <div className=" float-right" >
                            <button className="btn">
                                <i className="fas fa-pencil-alt mr-3" onClick={() => {
                                    // props.onEdit()
                                    // setCurrentContact(props.contact)
                                }} />
                            </button>
                            <button className="btn" onClick={() => props.onDelete()}>
                                <i className="fas fa-trash-alt" />
                            </button>
                            <Link to={`/contacts/${props.agenda.id}`}>
                                <button type="button" className="btn btn-success" onClick={() => { setCurrentAgenda(props.agenda.id) }}>Success</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </li>
        </>

    );
};

// /**
//  * Define the data-types for
//  * your component's properties
//  **/
// ContactCard.propTypes = {
//     history: PropTypes.object,
//     onDelete: PropTypes.func
// };

// /**
//  * Define the default values for
//  * your component's properties
//  **/
// ContactCard.defaultProps = {
//     onDelete: null
// };