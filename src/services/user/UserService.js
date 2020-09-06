import axios from 'axios';

export class UserService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}`,
			withCredentials: true,
		});
		this.service = service;
	}

	get = (id) => {
		return this.service.get(`users/${id}`).then((response) => response.data);
	};

	save = (username, name, email) => {
		return this.service
			.put('users/', { username, name, email })
			.then((response) => response.data);
	};
	upload = (file) => {
		const dataFile = new FormData();
		dataFile.append('imageAvatar', file);
		return this.service
			.patch('users/upload', dataFile)
			.then((response) => response.data);
	};
	checkusername = (id, username) => {
		return this.service
			.post('users/checkusername', { id, username })
			.then((response) => response.status)
			.catch((error) => error.status);
	};
	checkemail = (id, email) => {
		return this.service
			.post('users/checkemail', { id, email })
			.then((response) => response.status)
			.catch((error) => error.status);
	};
}
const userService = new UserService();

export default userService;
