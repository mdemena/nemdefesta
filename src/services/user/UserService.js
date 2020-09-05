import axios from 'axios';

export class UserService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}`,
			withCredentials: true,
		});
		this.service = service;
	}

	save = (username, name, email) => {
		return this.service
			.put('users/', { username, name, email })
			.then((response) => response.data);
	};
	upload = (file) => {
		console.log(file);
		const dataFile = new FormData();
		dataFile.append('imageAvatar', file);
		console.log(dataFile);
		return this.service
			.patch('users/upload', dataFile)
			.then((response) => response.data);
	};
}

export default UserService;
