import axios from 'axios';

export class CommentService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/comments`,
			withCredentials: true,
		});
		this.service = service;
	}
	create = (title, description, event, activity) => {
		return this.service
			.post(`/add/${eventId}`, {
				title,
				description,
				event,
				activity,
			})
			.then((response) => response.data);
	};
	get = (id) => {
		return this.service.get(`/${id}`).then((response) => response.data);
	};
	save = (id, title, description) => {
		return this.service
			.put(`/${id}`, {
				title,
				description,
			})
			.then((response) => response.data);
	};
	list = () => {
		console.log();
		return this.service.get('/').then((response) => response.data);
	};
	listOfEvent = (id) => {
		console.log();
		return this.service.get(`/event/${id}`).then((response) => response.data);
	};
	listOfActivity = (id) => {
		console.log();
		return this.service
			.get(`/activity/${id}`)
			.then((response) => response.data);
	};

	like = (id) => {
		return this.service.patch(`/like/${id}`).then((response) => response.data);
	};
	unlike = (id) => {
		return this.service
			.patch(`/unlike/${id}`)
			.then((response) => response.data);
	};
	delete = (id) => {
		return this.service.delete(`/${id}`).then((response) => response.data);
	};
}
const commentService = new CommentService();

export default commentService;
