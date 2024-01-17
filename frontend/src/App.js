import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/registerPage";
import Login from "./pages/loginPage";
import NotePage from "./pages/notePage";
import HomePage from "./pages/homePage";
import { useState } from "react";
import { LoginContext } from "../src/Contexts/LoginContext";
import { NoteContext } from "./Contexts/NoteContext";
import { SearchContext } from "./Contexts/SearchContext";
import AddNotePage from "./pages/addNotePage";
import CodePage from "./pages/codePage";

function App() {
	const [userObj, setUserObj] = useState();
	const [noteObj, setNoteObj] = useState();
  const [searchObj, setSearchObj] = useState("");
	//Checking if noteObj is stored
	// console.log("Global variable searchObj is ", searchObj);
	return (
		<NoteContext.Provider value={{ noteObj, setNoteObj }}>
			<LoginContext.Provider value={{ userObj, setUserObj }}>
				<SearchContext.Provider value={{ searchObj, setSearchObj }}>
					<Router>
						<div>
							<Routes>
								<Route path="/" element={<Login />} />
								<Route path="/login" element={<Login />} />
								<Route path="/register" element={<SignUp />} />
								<Route path="/home" element={<HomePage />} />
								<Route path="/addnote" element={<AddNotePage />} />
								<Route path="/note" element={<NotePage />} />
                <Route path="/code" element={<CodePage />} />
							</Routes>
						</div>
					</Router>
				</SearchContext.Provider>
			</LoginContext.Provider>
		</NoteContext.Provider>
	);
}

export default App;
