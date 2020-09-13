import React, { useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	Container,
	Button,
	Form,
	FormControl,
	InputGroup,
	Alert,
} from 'react-bootstrap';
// import { FaGoogle } from 'react-icons/fa';
import AuthService from '../../../services/auth/AuthService';

const loginReducer = (state, action) => {
	switch (action.type) {
		case 'field':
			return { ...state, [action.fieldName]: action.fieldValue };
		case 'alert':
			const { alertMessages } = state;
			alertMessages.push(action.alertMessage);
			return {
				...state,
				showAlert: true,
				alertMessages: alertMessages,
				isLoading: false,
			};
		case 'resetAlert':
			return {
				...state,
				showAlert: false,
				alertMessages: [],
			};
		case 'closeAlert':
			return { ...state, showAlert: false, alertMessages: [] };
		case 'login':
			return { ...state, isLoading: true };
		case 'notLoading':
			return { ...state, isLoading: false };
		case 'googleAuth':
			return { ...state, googleAuth: true };
		default:
			return state;
	}
};
const initialState = {
	username: '',
	password: '',
	isLoading: false,
	showAlert: false,
	alertMessages: [],
};

function Login(props) {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const history = useHistory();

	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch({ type: 'field', fieldName: name, fieldValue: value });
	};
	const handleFormSubmit = (event) => {
		event.preventDefault();
		dispatch({ type: 'resetAlert' });
		if (!state.username) {
			dispatch({ type: 'alert', alertMessage: `Has d'indicar un usuari` });
		}
		if (!state.password) {
			dispatch({
				type: 'alert',
				alertMessage: `Has d'indicar una clau d'accés`,
			});
		}
		if (state.password.length < 8) {
			dispatch({
				type: 'alert',
				alertMessage: `La clau d'accés ha de tenir un minim de 8 caràcters`,
			});
		}
		if (!state.showAlert) {
			dispatch({ type: 'login' });
			AuthService.login(state.username, state.password)
				.then((response) => {
					props.dispatch({ type: 'login', user: response });
					history.push('/');
				})
				.catch((error) =>
					dispatch({
						type: 'alert',
						alertMessage: error.response.data.message,
					})
				);
		}
	};

	const errorsMessage = state.alertMessages.map((err, index) => (
		<li key={index}>{err}</li>
	));
	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h3>Entra a Nem De Festa !!</h3>
			{/* <a href={AuthService.google()} className="btn btn-danger w-100">
				<span>
					<FaGoogle />
					&nbsp;&nbsp;Entra amb Google
				</span>
			</a> */}
			<hr />
			<Form onSubmit={handleFormSubmit} className="w-100">
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="username-text">Usuari:</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						id="username"
						name="username"
						type="text"
						value={state.username}
						onChange={handleChange}
						placeholder="Usuari"
						aria-label="Usuari"
						aria-describedby="username-text"
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="password-text">Clau:</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						type="password"
						id="password"
						name="password"
						value={state.password}
						onChange={handleChange}
						placeholder="Clau d'accés"
						aria-label="Clau d'accés"
						aria-describedby="password-text"
					/>
				</InputGroup>
				<Button
					type="submit"
					className="btn btn-success w-100"
					disabled={state.isLoading}
				>
					{state.isLoading ? 'Accedint ...' : 'Accedeix'}
				</Button>
				<Alert
					className="mt-2"
					variant="danger"
					show={state.showAlert}
					onClose={() => dispatch({ type: 'closeAlert' })}
					dismissible
				>
					<Alert.Heading>Ups!</Alert.Heading>
					<ul>{errorsMessage}</ul>
				</Alert>
			</Form>
			<hr />
			<p>
				No tens un compte?
				<Link to="/signup"> Registra't!!!</Link>
			</p>
		</Container>
	);
}

export default Login;
