import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import LikeIcon from '../social/LikeIcon';
import DisLikeIcon from '../social/DisLikeIcon';
import StarIcon from '../social/StarIcon';
import CommentIcon from '../comments/CommentIcon';
import EventService from '../../services/event/EventService';
import CommentCard from '../comments/CommentCard';
import dayjs from 'dayjs';
import ActivityCard from '../activities/ActivityCard';
import ImageCard from '../images/ImageCard';
require('dayjs/locale/es');

function EventDetail(props) {
	const { id } = useParams();
	const [element, setElement] = useState({
		activities: [],
		images: [],
		likes: [],
		unlikes: [],
		comments: [],
		attendees: [],
	});

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
			></ActivityCard>
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
			<Card className="bg-success text-white" border="success">
				<Card.Body>
					<Card.Title>{element.name}</Card.Title>
					<Card.Text>{element.description}</Card.Text>
					<Card.Text>
						Desdel {dayjs(element.fromDate).format('DD-MM-YYYY')} fins el{' '}
						{dayjs(element.toDate).format('DD-MM-YYYY')}
					</Card.Text>
				</Card.Body>
				<Card.Footer>
					<div className="d-flex flex-row justify-content-around align-items-center">
						<LikeIcon
							type="event"
							id={element._id}
							quantity={element.likes.length}
							user={props.user}
							onClick={handleClick}
						/>
						<DisLikeIcon
							type="event"
							id={element._id}
							quantity={element.unlikes.length}
							user={props.user}
							onClick={handleClick}
						/>
						<CommentIcon
							type="event"
							id={element._id}
							array={element.comments}
							user={props.user}
							onClick={handleClick}
						/>
						<StarIcon
							type="event"
							id={element._id}
							array={element.attendees.map((attendee) => attendee._id)}
							user={props.user}
							onClick={handleClick}
						/>
					</div>
				</Card.Footer>
			</Card>
			<Accordion defaultActiveKey="0" className="mt-2">
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="0">
						{element.activities.length} Activitat/s
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="0">
						<Card.Body>
							<ListGroup variant="flush">{activities}</ListGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="2">
						{element.images.length} Imatge/s
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="2">
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
