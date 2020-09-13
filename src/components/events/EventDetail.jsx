import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import EventService from '../../services/event/EventService';
import EventCard from './EventCard';
import ActivitiesAccordion from '../activities/ActivitiesAccordion';
import MapAccordion from '../maps/MapAccordion';
import CommentsAccordion from '../comments/CommentsAccordion';
import ImagesAccordion from '../images/ImagesAccordion';

const initialState = {
	location: { gpsLocation: { coordinates: [0, 0] } },
	locations: [],
	activities: [],
	images: [],
	likes: [],
	unlikes: [],
	comments: [],
	attendees: [],
};

function EventDetail(props) {
	const { id } = useParams();
	const [element, setElement] = useState(initialState);

	const getEvent = (id) => {
		EventService.get(id).then((response) => setElement(response));
	};

	useEffect(() => {
		getEvent(id);
	}, []);

	const handleClick = () => {
		getEvent(id);
	};

	return (
		<>
			<EventCard
				user={props.user}
				event={element}
				showImage={false}
				onClick={handleClick}
			/>
			<Accordion className="mt-2">
				<ActivitiesAccordion
					activities={element.activities}
					user={props.user}
					event={element._id}
					eventKey={0}
					onClick={handleClick}
				/>
				<MapAccordion
					title="Localitzacions"
					locations={element.locations}
					user={props.user}
					event={element._id}
					eventKey={1}
					centerLat={element.location.gpsLocation.coordinates[0]}
					centerLng={element.location.gpsLocation.coordinates[1]}
					onClick={handleClick}
				/>
				<CommentsAccordion
					comments={element.comments}
					user={props.user}
					event={element._id}
					eventKey={2}
					onClick={handleClick}
				/>
				<ImagesAccordion
					images={element.images}
					user={props.user}
					event={element._id}
					eventKey={3}
					onClick={handleClick}
				/>
			</Accordion>
		</>
	);
}

export default EventDetail;
