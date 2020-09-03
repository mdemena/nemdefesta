import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import {
	Container,
	Button,
	Form,
	FormControl,
	InputGroup,
} from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import AuthService from '../../../services/auth/AuthService';

function Login(props) {
	const authService = new AuthService();
	const initialState = {
		username: '',
		password: '',
	};
	const [user, setUser] = useState(initialState);

	const [redirect, setRedirect] = useState(false);
	const history = useHistory();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUser({ ...user, [name]: value });
	};
	const handleFormSubmit = (event) => {
		console.log(event);
		event.preventDefault();
		const username = user.username;
		const password = user.password;

		authService
			.login(username, password)
			.then((response) => {
				console.log(response);
				setUser({ username: '', password: '' });
				props.getUser(response);
				history.push('/');
			})
			.catch((error) => console.log(error));
	};

	if (redirect) {
		return <Redirect to={authService.google()} />;
	}

	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h3>Entra a Nem De Festa !!</h3>
			<a href={authService.google()} className="btn btn-danger w-100">
				<span>
					<FaGoogle />
					&nbsp;&nbsp;Entra amb Google
				</span>
			</a>
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
						value={user.username}
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
				No tens un compte?
				<Link to="/signup"> Registra't!!!</Link>
			</p>
		</Container>
	);
}

export default Login;
