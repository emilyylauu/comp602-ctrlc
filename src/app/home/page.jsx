import React from "react";
import Home from "../(component)/Home/home";
import NavBar from "../(component)/NavBar/navbar";
import Chatbot from "../(component)/Chatbot/chatbot";

export default function Page() {
	return (
		<>
			<NavBar />
			<Home />
			<Chatbot/>
		</>
	);
}
