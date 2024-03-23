import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { useEffect, useState } from "react";
import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { AddContact } from "./pages/AddContact";
import { Contacts } from "./pages/Contact";

export const AppContext = React.createContext();


//create your first component
const Layout = () => {

	const [userInput, setUserInput] = useState({})

	const [contacts, setContacts] = useState([]);
	const [currentContact, setCurrentContact] = useState([]);

	const myGetFetch = () => {

		fetch('https://playground.4geeks.com/apis/fake/contact/agenda/Leos')
			.then(response => {
				let contentType = response.headers.get("content-type");
				if (contentType && contentType.includes("application/json")) {
					return response.json();
				}
				throw new TypeError("Sorry, There's no JSON here!");
			})
			.then(jsonifiedResponse => { setContacts(jsonifiedResponse) })
			.catch(error => console.log(error));
	}

	useEffect(() => {
		myGetFetch()
	}, [])
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<AppContext.Provider value={{ contacts, setContacts, myGetFetch, userInput, setUserInput, currentContact, setCurrentContact }}>
				<BrowserRouter basename={basename}>
					<ScrollToTop>
						<Navbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/addcontact" element={<AddContact />} />
							<Route path="/contacts" element={<Contacts />} />
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