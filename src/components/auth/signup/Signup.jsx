import React, { useState, useReducer } from 'react';
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

const signupReducer = (state, action) => {
	switch (action.type) {
		case 'field':
			return { ...state, [action.fieldName]: action.fieldValue };
		case 'alert':
			const { alertMessages } = state;
			alertMessages.push(action.alertMessage);
			return { ...state, showAlert: true, alertMessages: alertMessages };
		case 'resetAlert':
			return {
				...state,
				showAlert: false,
				alertMessages: [],
			};
		case 'closeAlert':
			return { ...state, showAlert: false, alertMessages: [] };
		case 'loading':
			return { ...state, isLoading: true };
		case 'notLoading':
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

const initialState = {
	username: '',
	name: '',
	email: '',
	password: '',
	isLoading: false,
	showAlert: false,
	alertMessages: [],
};

function Signup(props) {
	const [state, dispatch] = useReducer(signupReducer, initialState);
	const [signup, setSignup] = useState(initialState);

	const validEmailRegex = RegExp(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
	);

	const history = useHistory();

	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch({ type: 'field', fieldName: name, fieldValue: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		await dispatch({ type: 'resetAlert' });
		if (!state.name) {
			await dispatch({ type: 'alert', alertMessage: `Has d'indicar un nom` });
		}
		if (!state.username) {
			await dispatch({
				type: 'alert',
				alertMessage: `Has d'indicar un usuari`,
			});
		} else {
			const status = await AuthService.checkusername(state.username);
			if (status === 200)
				await dispatch({
					type: 'alert',
					alertMessage: `L'usuari ${state.username} ja existeix, escull un altre`,
				});
		}
		if (!state.email) {
			await dispatch({ type: 'alert', alertMessage: `Has d'indicar un email` });
		} else {
			const status = await AuthService.checkemail(state.email);
			if (status === 200)
				await dispatch({
					type: 'alert',
					alertMessage: `L'email ${state.email} ja existeix, escull un altre`,
				});
		}
		if (!validEmailRegex.test(state.email)) {
			await dispatch({
				type: 'alert',
				alertMessage: `El format del email és incorrecte`,
			});
		}
		if (!state.password) {
			await dispatch({
				type: 'alert',
				alertMessage: `Has d'indicar una clau d'accés`,
			});
		}
		if (state.password.length < 8) {
			await dispatch({
				type: 'alert',
				alertMessage: `La clau d'accés ha de tenir un minim de 8 caràcters`,
			});
		}
		if (state.alertMessages.length === 0) {
			AuthService.signup(
				state.username,
				state.name,
				state.email,
				state.password
			)
				.then((response) => {
					props.dispatch({ type: 'login', user: response });
					history.push('/');
				})
				.catch((err) => {
					dispatch({
						type: 'alert',
						alertMessage: err.message,
					});
				});
		}
	};
	const errorsMessage = state.alertMessages.map((err, index) => (
		<li key={index}>{err}</li>
	));
	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h4>Nou usuari a Nem De Festa !!</h4>
			{/* <a href={AuthService.google()} className="btn btn-danger w-100">
				<span>
					<FaGoogle />
					&nbsp;&nbsp;Registra't amb Google
				</span>
			</a>
			<hr /> */}
			<Form onSubmit={handleFormSubmit} className="w-100">
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="name-text">Nom</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						id="name"
						name="name"
						type="text"
						value={state.name}
						onChange={handleChange}
						placeholder="Nom i Cognoms"
						aria-label="Nom i Cognoms"
						aria-describedby="name-text"
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="name-email">@</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						id="email"
						name="email"
						type="text"
						value={state.email}
						onChange={handleChange}
						placeholder="Correu electrònic"
						aria-label="Correu electrònic"
						aria-describedby="name-email"
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="username-text">Usuari</InputGroup.Text>
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
						<InputGroup.Text id="password-text">Clau</InputGroup.Text>
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
					{state.isLoading ? 'Registrant ...' : 'Registrar'}
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
				Ja tens un compte?
				<Link to="/login"> Entra!!!</Link>
			</p>
		</Container>
	);
}

export default Signup;
