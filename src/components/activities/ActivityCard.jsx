import React from 'react';
import { Card } from 'react-bootstrap';
import LikeIcon from '../social/LikeIcon';
import DisLikeIcon from '../social/DisLikeIcon';
import StarIcon from '../social/StarIcon';
import CommentIcon from '../comments/CommentIcon';

function ActivityCard(props) {
	const element = props.activity;

	const handleClick = () => {
		props.onClick();
	};
	return (
		<Card className="bg-success text-white" border="success">
			<Card.Img
				variant="top"
				src={element.image}
				alt={element.name}
				className="mw-100"
			/>
			<Card.Body>
				<Card.Title>{element.name}</Card.Title>
				<Card.Text>{element.description}</Card.Text>
				<Card.Text>
					Desde: {dayjs(element.fromDate).format('DD-MM-YYYY')} Fins:{' '}
					{dayjs(element.toDate).format('DD-MM-YYYY')}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<div className="d-flex flex-row justify-content-between align-items-center">
					<LikeIcon
						type="activity"
						id={element._id}
						quantity={element.likes.length}
						user={props.user}
						onClick={handleClick}
					/>
					<DisLikeIcon
						type="activity"
						id={element._id}
						quantity={element.unlikes.length}
						user={props.user}
						onClick={handleClick}
					/>
					<StarIcon
						type="activity"
						id={element._id}
						array={element.attendees}
						user={props.user}
						onClick={handleClick}
					/>
					<CommentIcon
						type="activity"
						id={element._id}
						array={element.comments}
						user={props.user}
						onClick={handleClick}
					/>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default ActivityCard;
