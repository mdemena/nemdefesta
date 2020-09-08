import React, { useReducer, useEffect } from 'react';
import { Container, Row, Spinner, CardDeck } from 'react-bootstrap';
import SearchBox from '../searchbox/SearchBox';
import EventService from '../../services/event/EventService';
import EventCard from './EventCard';
import dayjs from 'dayjs';
require('dayjs/locale/es');

const eventsReducer = (state, action) => {
	switch (action.type) {
		case 'field':
			sessionStorage.setItem(
				action.fieldName,
				JSON.stringify(action.fieldValue)
			);
			return { ...state, [action.fieldName]: action.fieldValue };
		case 'loading':
			return { ...state, isLoading: true };
		case 'notLoading':
			return { ...state, isLoading: false };
		default:
			return state;
	}
};
const initialState = {
	searchText: JSON.parse(sessionStorage.getItem('searchEvents')) || '',
	fromDate:
		JSON.parse(sessionStorage.getItem('fromDate')) ||
		dayjs().format('YYYY-MM-DD'),
	toDate:
		JSON.parse(sessionStorage.getItem('toDate')) ||
		dayjs().add(1, 'month').format('YYYY-MM-DD'),
	events: JSON.parse(sessionStorage.getItem('events')) || [],
	isLoading: false,
	isShowing: false,
};

function Events(props) {
	const [state, dispatch] = useReducer(eventsReducer, initialState);

	const handleChange = (search) => {
		console.log('Search:', search);
		const { searchText, fromDate, toDate } = search;
		console.log('Search2:', searchText, fromDate, toDate);
		dispatch({
			type: 'field',
			fieldName: 'searchText',
			fieldValue: searchText,
		});
		dispatch({
			type: 'field',
			fieldName: 'fromDate',
			fieldValue: fromDate,
		});
		dispatch({
			type: 'field',
			fieldName: 'toDate',
			fieldValue: toDate,
		});

		getEvents(fromDate, toDate, searchText);
	};

	useEffect(() => {
		getEvents(state.fromDate, state.toDate, state.searchText);
	}, []);

	function getEvents(fromDate, toDate, searchText) {
		dispatch({
			type: 'isLoading',
		});
		EventService.search(fromDate, toDate, searchText)
			.then((events) => {
				console.log(events);
				dispatch({
					type: 'field',
					fieldName: 'events',
					fieldValue: events,
				});
				dispatch({
					type: 'notLoading',
				});
			})
			.catch(() =>
				dispatch({
					type: 'notLoading',
				})
			);
	}

	console.log('State:', state);
	const events = state.events.map((event) => (
		<EventCard user={props.user} key={event._id} event={event} />
	));
	return (
		<Container>
			<Row>
				<SearchBox
					searchEvents={state.searchEvents}
					fromDate={state.fromDate}
					toDate={state.toDate}
					onChange={handleChange}
				/>
			</Row>
			<Row className="mt-2">
				{state.isLoading ? (
					<Spinner animation="border" variant="success" size="lg" role="status">
						<span className="sr-only">Carregant...</span>
					</Spinner>
				) : (
					<CardDeck>{events}</CardDeck>
				)}
			</Row>
		</Container>
	);
}

export default Events;
