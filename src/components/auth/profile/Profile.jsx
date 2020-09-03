import React, { useState } from 'react';
import {
	Container,
	Button,
	Form,
	FormControl,
	InputGroup,
} from 'react-bootstrap';
import UploadImage from './UploadFoto';
import UserService from '../../../services/user/UserService';

function Profile(props) {
	const userService = new UserService();
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
		props.user(image);
		props.callback(props.user);
	};
	const handleFormSubmit = (event) => {
		console.log(event);
		event.preventDefault();

		userService
			.signup(user.username, user.name, user.email)
			.then((response) => {
				console.log(response);
				props.callback(response);
			})
			.catch((error) => console.log(error));
	};
	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h4>El teu perfil</h4>
			<hr />
			<img
				src={user.image}
				alt={user.username}
				className="img-fluid img-thumbnail"
			/>
			<UploadImage onUpload={handleImage} image={user.image} />
			<hr />
			<Form onSubmit={handleFormSubmit} className="w-100">
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
				<hr />
				<Button type="submit" className="btn btn-success w-100">
					Graba
				</Button>
			</Form>
		</Container>
	);
}

export default Profile;
