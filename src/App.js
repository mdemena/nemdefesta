import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import MenuSuperior from './components/menusuperior/MenuSuperior';
import MenuInferior from './components/menuinferior/MenuInferior';
import ProtectedRoute from './components/auth/protected-route';
import Home from './components/Home';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import ProfileSetup from './components/auth/profile/ProfileSetup';
import Profile from './components/auth/profile/Profile';
import './App.scss';

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
				<Route exact path="/">
					<Home user={user} />
				</Route>
				<Route path="/login">
					<Login getUser={getTheUser} />
				</Route>
				<Route path="/signup">
					<Signup getUser={getTheUser} />
				</Route>
				<Route path="/profile/:id">
					<Profile />
				</Route>
				<ProtectedRoute
					user={user}
					callback={setUser}
					exact
					path="/profile"
					component={ProfileSetup}
				/>
			</Switch>
			<MenuInferior user={user} />
		</Container>
	);
}

export default App;
