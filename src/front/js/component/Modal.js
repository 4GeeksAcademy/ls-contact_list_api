import React, { useState, useEffect,useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { AppContext } from "../layout";



export const Modal = props => {
	
	const{ myGetFetch }=useContext(AppContext)

	const deleteFetch=(id)=>{
		fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, { method: 'DELETE' })
        .then(() => myGetFetch());
	}


	
	const deleteContact=(id,closeModalFx)=>{
		deleteFetch(id);;
		closeModalFx({ showModal: false});
	}
	
	
	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Are you sure?</h5>
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
						<p>Warning: unknown consequences after this point... Kidding!</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger"  onClick={() => props.onClose({ showModal: false})}>
							Oh no!
						</button>
						<button type="button" className="btn btn-success" onClick={()=>{deleteContact(props.id,props.onClose)}}  data-dismiss="modal">
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
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool
};

/**
 * Define the default values for
 * your component's properties
 **/
Modal.defaultProps = {
	show: false,
	onClose: null
};