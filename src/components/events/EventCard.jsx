import React from 'react';
import { Card } from 'react-bootstrap';
import Likes from '../social/Likes';
import DisLikes from '../social/DisLikes';
import Star from '../social/Star';

function EventCard(props) {
	const handleClick = () => {
		props.onClick();
	};
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
			</Card.Body>
			<Card.Footer>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<Likes
						type="event"
						id={props.event._id}
						quantity={props.event.likes.length}
						user={props.user}
						onClick={handleClick}
					/>
					<DisLikes
						type="event"
						id={props.event._id}
						quantity={props.event.unlikes.length}
						user={props.user}
						onClick={handleClick}
					/>
					<Star
						type="event"
						id={props.event._id}
						array={props.event.attendees}
						user={props.user}
						onClick={handleClick}
					/>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default EventCard;
