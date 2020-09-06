import React, { useState } from 'react';
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
import { Redirect } from 'react-router-dom';
import Avatar from './Avatar';
import UserService from '../../../services/user/UserService';
import AuthService from '../../../services/auth/AuthService';

function ProfileSetup(props) {
	const userService = new UserService();
	const [loading, setLoading] = useState(false);
	const initialState = {
		image: props.user.image,
		username: props.user.username,
		name: props.user.name,
		email: props.user.email,
	};
	const [user, setUser] = useState(initialState);
	const validEmailRegex = RegExp(
		/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	);
	const [showAlert, setShowAlert] = useState({ show: false, messages: [] });
	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};
	const handleImage = (image) => {
		setUser({ ...user, image: image });
		props.callback(props.user);
	};
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		const errMessages = [];
		if (!user.name) {
			errMessages.push(`Has d'indicar un nom`);
		}
		if (!user.username) {
			errMessages.push(`Has d'indicar un usuari`);
		} else {
			const status = await userService.checkusername(user._id, user.username);
			if (status === 200)
				errMessages.push(
					`L'usuari ${user.username} ja existeix, escull un altre`
				);
		}
		if (!user.email) {
			errMessages.push(`Has d'indicar un email`);
		} else {
			const status = await userService.checkemail(user._id, user.email);
			if (status === 200)
				errMessages.push(`L'email ${user.email} ja existeix, escull un altre`);
		}
		if (!validEmailRegex.test(user.email)) {
			errMessages.push(`El format del email és incorrecte`);
		}
		if (errMessages.length > 0) {
			setShowAlert({ show: true, messages: errMessages });
		} else {
			setLoading(true);
			userService
				.save(user.username, user.name, user.email)
				.then((response) => {
					console.log(response);
					props.callback(response);
					setLoading(false);
				})
				.catch((error) => setShowAlert({ show: true, messages: [error] }));
		}
	};
	const handleLogout = (image) => {
		AuthService.logout();
		props.callback(undefined);
	};
	AuthService.loggedin().then((logged) => {
		if (!logged) {
			props.callback(undefined);
			return <Redirect to="/" />;
		}
	});

	const errorsMessage = showAlert.messages.map((err, index) => (
		<li key={index}>{err}</li>
	));

	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h4>El teu perfil</h4>
			<hr />
			<Avatar onUpload={handleImage} image={user.image} />
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
						value={user.username}
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
						value={user.name}
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
						value={user.email}
						onChange={handleChange}
						placeholder="Correu electrònic"
						aria-label="Correu electrònic"
						aria-describedby="name-email"
					/>
				</InputGroup>
				<Button type="submit" className="btn btn-success w-100 mt-2">
					Graba
				</Button>
				<Button className="btn btn-danger w-100 mt-2" onClick={handleLogout}>
					Tanca sessió
				</Button>
				<Alert
					className="mt-2"
					variant="danger"
					show={showAlert.show}
					onClose={() => setShowAlert({ show: false, messages: [] })}
					dismissible
				>
					<Alert.Heading>Ups!</Alert.Heading>
					<ul>{errorsMessage}</ul>
				</Alert>
			</Form>
			<Modal
				show={loading}
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
