import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import EventService from '../../services/event/EventService';
import ActivityCard from '../activities/ActivityCard';
import ImagesAccordion from '../images/ImagesAccordion';
import MapCard from '../maps/MapCard';
import EventCard from './EventCard';
import { BsGeo } from 'react-icons/bs';
import { MdLocalActivity } from 'react-icons/md';
import CommentsAccordion from '../comments/CommentsAccordion';

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
	const activities = element.activities.map((activity) => (
		<ListGroup.Item key={activity._id} className="pl-0 pr-0">
			<ActivityCard
				user={props.user}
				activity={activity}
				onClick={handleClick}
				showLocation
			></ActivityCard>
		</ListGroup.Item>
	));
	const activitiesMap = element.locations;
	const activitiesMapCenter = {
		lat: element.location.gpsLocation.coordinates[0],
		lng: element.location.gpsLocation.coordinates[1],
	};

	return (
		<>
			<EventCard
				user={props.user}
				event={element}
				showImage={false}
				onClick={handleClick}
			/>
			<Accordion defaultActiveKey="0" className="mt-2">
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">
						<div className="d-flex flex-row justify-content-between align-items-center">
							{element.activities.length} Activitats
							<MdLocalActivity size="20px" />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<ListGroup variant="flush">{activities}</ListGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="1">
						<div className="d-flex flex-row justify-content-between align-items-center">
							Localitzacions
							<BsGeo size="20px" />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<MapCard
								center={activitiesMapCenter}
								points={activitiesMap}
								zoom={15}
							/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
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
