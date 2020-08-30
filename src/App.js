import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import MenuSuperior from './components/menusuperior/MenuSuperior';
import MenuInferior from './components/menuinferior/MenuInferior';
import './App.css';

require('dotenv').config();

function App() {
	const [user, setUser] = useState(null);
	const getTheUser = (user) => {
		setUser(user);
	};
	return (
		<Container className="fill-window">
			<MenuSuperior />
			<Switch>
				<Route path="/login"></Route>
			</Switch>
			<MenuInferior />
		</Container>
	);
}

export default App;
