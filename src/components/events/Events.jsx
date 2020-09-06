import React, { useReducer } from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchBox from '../searchbox/SearchBox';
import { DateUtils } from 'react-day-picker';

const eventsReducer = (state, action) => {
	switch (action.type) {
		case 'fields':
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
	searchEvents: sessionStorage.getItem('searchEvents') || '',
	fromDate: sessionStorage.getItem('fromDate') || new Date(),
	toDate:
		sessionStorage.getItem('toDate') || DateUtils.addMonths(new Date(), 1),
	events: sessionStorage.getItem('events') || [],
	isLoading: false,
	isShowing: false,
};

function Events() {
	const [state, dispatch] = useReducer(eventsReducer, initialState);

	const handleChange = (searchText) => {
		dispatch({ type: 'searchText', searchText });
	};
	return (
		<Container>
			<Row>
				<SearchBox searchEvents={state.searchEvents} onChange={handleChange} />
			</Row>
			<Row></Row>
		</Container>
	);
}

export default Events;
