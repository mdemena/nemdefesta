import React from 'react';
import { Card } from 'react-bootstrap';
import Likes from '../social/Likes';
import DisLikes from '../social/DisLikes';
import Star from '../social/Star';

function EventCard(props) {
	return (
		<Card className="bg-success text-white" border="success">
			<Card.Img
				variant="top"
				src={props.event.image}
				alt={props.name}
				className="mw-100"
			/>
			<Card.Body>
				<Card.Title>{props.event.name}</Card.Title>
				<Card.Text>{props.event.description}</Card.Text>
				<Card.Text>Last updated 3 mins ago</Card.Text>
			</Card.Body>
			<Card.Footer>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<Likes
						type="event"
						id={props._id}
						quantity={props.event.likes.count}
						user={props.user}
					/>
					<DisLikes
						type="event"
						id={props._id}
						quantity={props.event.unlikes.count}
						user={props.user}
					/>
					<Star
						type="event"
						id={props._id}
						array={props.event.attendees}
						user={props.user}
					/>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default EventCard;
