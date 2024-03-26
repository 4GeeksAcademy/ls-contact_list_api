import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { useEffect, useState } from "react";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AddContact } from "./pages/AddContact";
import { Contacts } from "./pages/Contact";
import { Login } from "./pages/login";
import { Agenda } from "./pages/Agenda";
import { CustomizeRule } from "webpack-merge";
export const AppContext = React.createContext();


//create your first component
const Layout = () => {

	const [currentUser, setCurrentUser] = useState({})
	const [currentAgenda, setCurrentAgenda] = useState({})

	const [userInput, setUserInput] = useState({})

	const [contacts, setContacts] = useState([]);
	const [currentContact, setCurrentContact] = useState([]);

	const myGetFetch = () => {

		fetch(`https://scaling-space-acorn-977rjvgv76wxcpvp9-3000.app.github.dev/api/${currentAgenda.id}/contacts`)
			.then(response => {
				let contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					return response.json();
				}
				throw new TypeError("Sorry, There's no JSON here!");
			})
			.then(jsonifiedResponse => { print(jsonifiedResponse) })
			.catch(error => console.log(error));
	}
	


	const basename = process.env.BASENAME || "";

	return (
		<div>
			<AppContext.Provider value={{ contacts, setContacts, myGetFetch, userInput, currentContact, setCurrentContact, setUserInput, currentUser, setCurrentUser, currentAgenda, setCurrentAgenda }}>
				<BrowserRouter basename={basename}>
					<ScrollToTop>
						<Navbar />
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/addcontact" element={<AddContact />} />
							<Route path="/agendas" element={<Agenda />} />
							<Route path="/contacts/:agendaid" element={<Contacts />} />
							<Route path="*" element={<h1>Not found!</h1>} />
						</Routes>
						<Footer />
					</ScrollToTop>
				</BrowserRouter>
			</AppContext.Provider>
		</div>
	);
};

export default injectContext(Layout);