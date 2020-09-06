import React, { useReducer } from 'react';
import {
	Container,
	Button,
	Form,
	FormControl,
	InputGroup,
	Spinner,
	Modal,
	Alert,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Avatar from './Avatar';
import UserService from '../../../services/user/UserService';
import AuthService from '../../../services/auth/AuthService';

const profileReducer = (state, action) => {
	switch (action.type) {
		case 'field':
			return { ...state, [action.fieldName]: action.fieldValue };
		case 'alert':
			const { alertMessages } = state;
			alertMessages.push(action.alertMessage);
			return { ...state, showAlert: true, alertMessages: alertMessages };
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

const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

function ProfileSetup(props) {
	const initialState = {
		image: props.user.image,
		username: props.user.username,
		name: props.user.name,
		email: props.user.email,
		isLoading: false,
		showAlert: false,
		alertMessages: [],
	};
	const [state, dispatch] = useReducer(profileReducer, initialState);
	const history = useHistory();
	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch({ type: 'field', fieldName: name, fieldValue: value });
	};
	const handleImage = (user) => {
		dispatch({ type: 'field', fieldName: 'image', fieldValue: user.image });
		props.callback({ type: 'login', user: user });
	};
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const errMessages = [];
		if (!state.name) {
			dispatch({ type: 'alert', alertMessage: `Has d'indicar un nom` });
		}
		if (!state.username) {
			dispatch({ type: 'alert', alertMessage: `Has d'indicar un usuari` });
		} else {
			const status = await UserService.checkusername(
				props.user._id,
				state.username
			);
			if (status === 200)
				dispatch({
					type: 'alert',
					alertMessage: `L'usuari ${state.username} ja existeix, escull un altre`,
				});
		}
		if (!state.email) {
			dispatch({ type: 'alert', alertMessage: `Has d'indicar un email` });
		} else {
			const status = await UserService.checkemail(props.user._id, state.email);
			if (status === 200)
				dispatch({
					type: 'alert',
					alertMessage: `L'email ${state.email} ja existeix, escull un altre`,
				});
		}
		if (!validEmailRegex.test(state.email)) {
			dispatch({
				type: 'alert',
				alertMessage: `El format del email és incorrecte`,
			});
		}
		if (!state.showAlert) {
			dispatch({ type: 'loading' });
			UserService.save(state.username, state.name, state.email)
				.then((response) => {
					props.callback({ type: 'login', user: response });
				})
				.catch((error) =>
					dispatch({
						type: 'alert',
						alertMessage: error.response.data.message,
					})
				);
			dispatch({ type: 'notLoading' });
		}
	};
	const handleLogout = async (image) => {
		await AuthService.logout();
		props.callback({ type: 'logout' });
		history.push('/');
	};

	const errorsMessage = state.alertMessages.map((err, index) => (
		<li key={index}>{err}</li>
	));

	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h4>El teu perfil</h4>
			<hr />
			<Avatar onUpload={handleImage} image={state.image} />
			<hr />
			<Form onSubmit={handleFormSubmit} className="w-100">
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
				<Button
					type="submit"
					className="btn btn-success w-100"
					disabled={state.isLoading}
				>
					{state.isLoading ? 'Salvant ...' : 'Salvar'}
				</Button>
				<Button
					className="btn btn-danger w-100 mt-2"
					onClick={handleLogout}
					disabled={state.isLoading}
				>
					Tanca sessió
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
			<Modal
				show={state.isLoading}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<Modal.Title>Guardant la Informació</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid className="d-flex flex-column align-items-center">
						<Spinner
							animation="border"
							variant="success"
							size="lg"
							role="status"
						>
							<span className="sr-only">Grabant...</span>
						</Spinner>
					</Container>
				</Modal.Body>
			</Modal>
		</Container>
	);
}

export default ProfileSetup;
