import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	Container,
	Button,
	Form,
	FormControl,
	InputGroup,
} from 'react-bootstrap';
import AuthService from '../../../services/auth/AuthService';

function Signup(props) {
	const authService = new AuthService();
	const initialState = {
		username: '',
		name: '',
		email: '',
		password: '',
	};
	const [user, setUser] = useState(initialState);
	const history = useHistory();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};
	const handleFormSubmit = (event) => {
		console.log(event);
		event.preventDefault();

		authService
			.signup(user.username, user.name, user.email, user.password)
			.then((response) => {
				console.log(response);
				props.getUser(response);
				history.push('/');
			})
			.catch((error) => console.log(error));
	};

	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h4>Nou usuari a Nem De Festa !!</h4>
			<a href={authService.google()} className="btn btn-danger w-100">
				<span>
					<FaGoogle />
					&nbsp;&nbsp;Registra't amb Google
				</span>
			</a>
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
				<InputGroup className="mb-3">
					<InputGroup.Prepend>
						<InputGroup.Text id="password-text">Clau</InputGroup.Text>
					</InputGroup.Prepend>
					<FormControl
						type="password"
						id="password"
						name="password"
						value={user.password}
						onChange={handleChange}
						placeholder="Clau d'accés"
						aria-label="Clau d'accés"
						aria-describedby="password-text"
					/>
				</InputGroup>
				<Button type="submit" className="btn btn-success w-100">
					Accedeix
				</Button>
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
