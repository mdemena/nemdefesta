import React, { useState } from 'react';
import {
	Container,
	Button,
	Form,
	FormControl,
	InputGroup,
	Spinner,
	Modal,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Avatar from './Avatar';
import UserService from '../../../services/user/UserService';
import AuthService from '../../../services/auth/AuthService';

function ProfileSetup(props) {
	const userService = new UserService();
	const authService = new AuthService();
	const [loading, setLoading] = useState(false);
	const initialState = {
		image: props.user.image,
		username: props.user.username,
		name: props.user.name,
		email: props.user.email,
	};
	const [user, setUser] = useState(initialState);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};
	const handleImage = (image) => {
		setUser({ ...user, image: image });
		props.callback(props.user);
	};
	const handleFormSubmit = (event) => {
		event.preventDefault();
		setLoading(true);
		userService
			.save(user.username, user.name, user.email)
			.then((response) => {
				console.log(response);
				props.callback(response);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};

	authService.loggedin().then((status) => {
		if (status === 403) {
			return <Redirect to="/" />;
		}
	});

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
				<hr />
				<Button type="submit" className="btn btn-success w-100">
					Graba
				</Button>
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
