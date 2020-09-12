import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import EventService from '../../services/event/EventService';
import CommentCard from '../comments/CommentCard';
import ActivityCard from '../activities/ActivityCard';
import ImageCard from '../images/ImageCard';
import MapCard from '../maps/MapCard';
import EventCard from './EventCard';
import { BiCommentDetail } from 'react-icons/bi';
import { BsGeo, BsImages } from 'react-icons/bs';
import { MdLocalActivity } from 'react-icons/md';

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
	const comments = element.comments.map((comment) => (
		<ListGroup.Item key={comment._id} className="pl-0 pr-0">
			<CommentCard
				user={props.user}
				comment={comment}
				onClick={handleClick}
			></CommentCard>
		</ListGroup.Item>
	));
	const images = element.images.map((image) => (
		<ListGroup.Item key={image._id} className="pl-0 pr-0">
			<ImageCard
				user={props.user}
				image={image}
				onClick={handleClick}
			></ImageCard>
		</ListGroup.Item>
	));

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
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="2">
						<div className="d-flex flex-row justify-content-between align-items-center">
							{element.comments.length} Comentaris
							<BiCommentDetail size="20px" />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="2">
						<Card.Body>
							<ListGroup variant="flush">{comments}</ListGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="3">
						<div className="d-flex flex-row justify-content-between align-items-center">
							{element.images.length} Imatges
							<BsImages size="20px" />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="3">
						<Card.Body>
							<ListGroup variant="flush">{images}</ListGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
}

export default EventDetail;
