import axios from 'axios';

class AuthService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/auth`,
			withCredentials: true,
		});
		this.service = service;
	}

	signup = (username, name, email, password) => {
		return this.service
			.post('/signup', { username, name, email, password })
			.then((response) => response.data);
	};
	login = (username, password) => {
		return this.service
			.post('/login', { username, password })
			.then((response) => response.data);
	};
	checkusername = (username) => {
		return this.service
			.post('/checkusername', { username })
			.then((response) => response.status)
			.catch((error) => error.status);
	};
	checkemail = (email) => {
		return this.service
			.post('/checkemail', { email })
			.then((response) => response.status)
			.catch((error) => error.status);
	};
	google = () => {
		return process.env.REACT_APP_API_URL + '/google';
	};
	logout = () => {
		return this.service
			.post('/logout', {})
			.then((response) => response.status === 200);
	};
	loggedin = () => {
		return this.service
			.post('/loggedin')
			.then((response) => response.status === 200)
			.catch((error) => error.status === 200);
	};
}
const authService = new AuthService();

export default authService;
