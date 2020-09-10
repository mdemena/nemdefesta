import axios from 'axios';

export class ImageService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/images`,
			withCredentials: true,
		});
		this.service = service;
	}
	create = (title, description, event, activity, file) => {
		const image = new FormData();
		image.append('title', title);
		image.append('description', description);
		image.append('event', event);
		image.append('activity', activity);
		image.append('image', file);

		return this.service.post(`/`, image).then((response) => response.data);
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
		return this.service.get('/').then((response) => response.data);
	};
	listOfEvent = (id) => {
		return this.service.get(`/event/${id}`).then((response) => response.data);
	};
	listOfActivity = (id) => {
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
const imageService = new ImageService();

export default imageService;
