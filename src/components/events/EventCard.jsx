import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import LikeIcon from '../icons/LikeIcon';
import DisLikeIcon from '../icons/DisLikeIcon';
import PeopleIcon from '../icons/PeopleIcon';
import CommentIcon from '../comments/CommentIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function EventCard(props) {
	const element = props.event;
	const history = useHistory();
	const showDescription =
		props.showDescription === undefined ? true : props.showDescription;
	const showButtons =
		props.showButtons === undefined ? true : props.showButtons;
	const showDates = props.showDates === undefined ? true : props.showDates;
	const showImage = props.showImage === undefined ? true : props.showImage;

	const handleClick = () => {
		props.onClick();
	};
	const handleDetail = (id) => {
		history.push('/events/' + id);
	};
	const image = showImage ? (
		<Card.Img
			variant="top"
			src={element.image}
			alt={element.name}
			className="mw-100"
			onClick={() => handleDetail(element._id)}
		/>
	) : (
		<></>
	);

	const description = showDescription ? (
		<Card.Text>{element.description}</Card.Text>
	) : (
		<></>
	);
	const dates = showDates ? (
		<Card.Text>
			<small>
				Des del {dayjs(element.fromDate).format('DD-MM-YYYY')} fins el{' '}
				{dayjs(element.toDate).format('DD-MM-YYYY')}
			</small>
		</Card.Text>
	) : (
		<></>
	);
	const buttons = showButtons ? (
		<Card.Footer className="bg-success text-white" >
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
				<PeopleIcon
					type="event"
					id={element._id}
					array={element.attendees}
					user={props.user}
					onClick={handleClick}
				/>
			</div>
		</Card.Footer>
	) : (
		<></>
	);
	return (
		<Card className="cardEvent" border="success">
			{image}
			<Card.Body onClick={() => handleDetail(element._id)}>
				<Card.Title>{element.name}</Card.Title>
				{description}
				{dates}
			</Card.Body>
			{buttons}
		</Card>
	);
}

export default EventCard;
