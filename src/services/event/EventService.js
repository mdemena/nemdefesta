import axios from 'axios';

export class EventService {
	constructor() {
		let service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URL}/events`,
			withCredentials: true,
		});
		this.service = service;
	}
	create = (
		name,
		description,
		fromDate,
		toDate,
		locationName,
		locationAddress,
		locationFormattedAddress,
		locationCoordinatesLng,
		locationCoordinatesLat
	) => {
		return this.service
			.post(`/add`, {
				name,
				description,
				fromDate,
				toDate,
				locationName,
				locationAddress,
				locationFormattedAddress,
				locationCoordinatesLng,
				locationCoordinatesLat,
			})
			.then((response) => response.data);
	};
	get = (id) => {
		return this.service.get(`/${id}`).then((response) => response.data);
	};
	save = (
		id,
		name,
		description,
		fromDate,
		toDate,
		locationName,
		locationAddress,
		locationFormattedAddress,
		locationCoordinatesLng,
		locationCoordinatesLat
	) => {
		return this.service
			.put(`/${id}`, {
				name,
				description,
				fromDate,
				toDate,
				locationName,
				locationAddress,
				locationFormattedAddress,
				locationCoordinatesLng,
				locationCoordinatesLat,
			})
			.then((response) => response.data);
	};
	search = (fromDate, toDate, searchText) => {
		console.log(fromDate, toDate, searchText);
		return this.service
			.post('/', { fromDate, toDate, searchText })
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
	attendee = (id) => {
		return this.service
			.patch(`/attendee/${id}`)
			.then((response) => response.data);
	};
	upload = (id, file) => {
		const dataFile = new FormData();
		dataFile.append('image', file);
		return this.service
			.patch(`/upload/${id}`, dataFile)
			.then((response) => response.data);
	};
	delete = (id) => {
		return this.service.delete(`/${id}`).then((response) => response.data);
	};
}
const eventService = new EventService();

export default eventService;
