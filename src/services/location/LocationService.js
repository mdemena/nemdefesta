import axios from 'axios';

export class LocationService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/events`,
			withCredentials: true,
		});
		this.service = service;
	}
	create = (name, address, formattedAddress, longitude, latitude, eventId) => {
		return this.service
			.post(`/`, {
				name,
				address,
				formattedAddress,
				longitude,
				latitude,
				eventId,
			})
			.then((response) => response.data);
	};
	get = (id) => {
		return this.service.get(`/${id}`).then((response) => response.data);
	};
	save = (id, name, address, formattedAddress, longitude, latitude) => {
		return this.service
			.put(`/${id}`, {
				name,
				address,
				formattedAddress,
				longitude,
				latitude,
			})
			.then((response) => response.data);
	};
	list = () => {
		return this.service.get('/').then((response) => response.data);
	};
	listOfEvent = (id) => {
		return this.service.get(`/event/${id}`).then((response) => response.data);
	};
	delete = (id) => {
		return this.service.delete(`/${id}`).then((response) => response.data);
	};
}
const locationService = new LocationService();

export default locationService;
