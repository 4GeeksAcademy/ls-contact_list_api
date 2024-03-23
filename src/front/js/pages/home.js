import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {

	return (

		<div className="container text-center">
			<div className="row align-items-center">
				<div className="col">
					One of three columns
				</div>
				<div className="col p-5 bg-danger mt-5 border border-success">

					<div className="row m-2">
						<div className="col h1 mb-2 text-success-emphasis">
							Contact List
						</div>
					</div>
					<div className="row m-2">
						<div className="col">
							<input type="email" className="form-control" id="colFormLabel" placeholder="Username" />
						</div>
					</div>
					<div className="row m-2">
						<div className="col">
							<input type="email" className="form-control" id="colFormLabel" placeholder="Password" />
						</div>
					</div>
					<div className="row m-2">
						<div className="col d-flex justify-content-center text-align-center">
							<button type="button" className="btn btn-light m-1">New Account</button>
							<button type="button" className="btn btn-success m-1">Log in</button>
						</div>
					</div>
				</div>
				<div className="col">
					One of three columns
				</div>
			</div>
		</div>
	)
}





