import axios from 'axios';

export class AuthService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}`,
			withCredentials: true,
		});
		this.service = service;
	}

	signup = (username, name, email, password) => {
		return this.service
			.post('auth/signup', { username, name, email, password })
			.then((response) => response.data);
	};
	login = (username, password) => {
		return this.service
			.post('auth/login', { username, password })
			.then((response) => response.data);
	};
	google = () => {
		return process.env.REACT_APP_API_URL + 'auth/google';
	};
	logout = () => {
		return this.service
			.post('auth/logout', {})
			.then((response) => response.data);
	};
	loggedin = () => {
		return this.service
			.post('auth/loggedin')
			.then((response) => response.status);
	};
}

export default AuthService;
