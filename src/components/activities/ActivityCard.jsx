import React from 'react';
import { Card } from 'react-bootstrap';
import LikeIcon from '../social/LikeIcon';
import DisLikeIcon from '../social/DisLikeIcon';
import StarIcon from '../social/StarIcon';
import CommentIcon from '../comments/CommentIcon';
import LocationIcon from '../locations/LocationIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function ActivityCard(props) {
	const element = props.activity;

	const handleClick = () => {
		props.onClick();
	};
	const location = element.location ? (
		<LocationIcon location={element.location} />
	) : (
		<></>
	);
	return (
		<Card className="bg-success text-white" border="success">
			<Card.Body>
				<Card.Title>{element.name}</Card.Title>
				<Card.Text>{element.description}</Card.Text>
				<Card.Text>
					<div>
						<small>
							Des del {dayjs(element.fromDate).format('DD-MM-YYYY')} a les{' '}
							{dayjs(element.fromDate).format('HH:MM')}
						</small>
					</div>
					<div>
						<small>
							Fins el {dayjs(element.toDate).format('DD-MM-YYYY')} a les{' '}
							{dayjs(element.toDate).format('HH:MM')}
						</small>
					</div>
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<div className="d-flex flex-row justify-content-around align-items-center">
					{location}
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
					<CommentIcon
						type="activity"
						id={element._id}
						array={element.comments}
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
				</div>
			</Card.Footer>
		</Card>
	);
}

export default ActivityCard;
