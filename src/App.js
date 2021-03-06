import React, { useReducer, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';
import TopMenu from './components/topmenu/TopMenu';
import BottomMenu from './components/bottommenu/BottomMenu';
import ProtectedRoute from './components/auth/protectedroute/ProtectedRoute';
import Events from './components/events/Events';
import Login from './components/auth/login/Login';
import Signup from './components/auth/signup/Signup';
import ProfileSetup from './components/profile/ProfileSetup';
import ProfileDetail from './components/profile/ProfileDetail';
import EventDetail from './components/events/EventDetail';
import Map from './components/maps/Map';
import AuthService from './services/auth/AuthService';
import './App.scss';
import ActivityDetail from './components/activities/ActivityDetail';

require('dotenv').config();

const appReducer = (state, action = {}) => {
	switch (action.type) {
		case 'login':
			const { user } = action;
			localStorage.setItem('user', JSON.stringify(user));
			return { user };
		case 'logout':
			localStorage.removeItem('user');
			return { user: null };
		default:
			return state;
	}
};

const initialState = {
	user: JSON.parse(localStorage.getItem('user') || null),
};

function App() {
	const [state, dispatch] = useReducer(appReducer, initialState);
	const { user } = state;

	useEffect(() => {
		AuthService.loggedin()
			.then((response) => {
				if (!response) {
					dispatch({ type: 'logout' });
				} else if (!user) {
					AuthService.logout().then(() => dispatch({ type: 'logout' }));
				}
			})
			.catch((err) => dispatch({ type: 'logout' }));
	}, []);

	return (
		<Container className="fill-window overflow-auto pb-5">
			<TopMenu />
			<Switch>
				<Route exact path="/">
					<Events user={user} />
				</Route>
				<Route exact path="/map">
					<Map user={user} />
				</Route>
				<Route path="/login">
					<Login dispatch={dispatch} />
				</Route>
				<Route path="/signup">
					<Signup dispatch={dispatch} />
				</Route>
				<Route path="/profile/:id" component={ProfileDetail}></Route>
				<Route exact path="/events">
					<Events user={user} />
				</Route>
				<Route path="/events/:id">
					<EventDetail user={user} />
				</Route>
				<Route path="/activities/:id">
					<ActivityDetail user={user} />
				</Route>
				<ProtectedRoute
					user={user}
					callback={dispatch}
					exact
					path="/profile"
					component={ProfileSetup}
				/>
			</Switch>
			<BottomMenu user={user} />
		</Container>
	);
}

export default App;
