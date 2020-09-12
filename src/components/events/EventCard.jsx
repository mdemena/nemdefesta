import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import LikeIcon from '../social/LikeIcon';
import DisLikeIcon from '../social/DisLikeIcon';
import StarIcon from '../social/StarIcon';
import CommentIcon from '../comments/CommentIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function EventCard(props) {
	const element = props.event;
	const history = useHistory();

	const handleClick = () => {
		props.onClick();
	};
	const handleDetail = (id) => {
		history.push('/events/' + id);
	};
	return (
		<Card className="bg-success text-white" border="success">
			{props.showImage ? <Card.Img
				variant="top"
				src={element.image}
				alt={element.name}
				className="mw-100"
				onClick={() => handleDetail(element._id)}
			/>:<></>}
			<Card.Body onClick={() => handleDetail(element._id)}>
				<Card.Title>{element.name}</Card.Title>
				<Card.Text>{element.description}</Card.Text>
				<Card.Text>
					<small>
						Des del {dayjs(element.fromDate).format('DD-MM-YYYY')} fins el{' '}
						{dayjs(element.toDate).format('DD-MM-YYYY')}
					</small>
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
						array={element.attendees}
						user={props.user}
						onClick={handleClick}
					/>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default EventCard;
