import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import LikeIcon from '../icons/LikeIcon';
import DisLikeIcon from '../icons/DisLikeIcon';
import PeopleIcon from '../icons/PeopleIcon';
import CommentIcon from '../comments/CommentIcon';
import LocationIcon from '../locations/LocationIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function ActivityCard(props) {
	const element = props.activity;
	const history = useHistory();
	const showImage = props.showImage === undefined ? true : props.showImage;
	const showDescription =
		props.showDescription === undefined ? true : props.showDescription;
	const showDates = props.showDates === undefined ? true : props.showDates;
	const showLocation =
		props.showLocation === undefined ? true : props.showLocation;
	const showButtons =
		props.showButtons === undefined ? true : props.showButtons;

	const handleClick = () => {
		props.onClick();
	};
	const handleDetail = (id) => {
		history.push('/activities/' + id);
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
		<Card.Text className="d-flex flex-column">
			<span>
				<small>
					Des del {dayjs(element.fromDate).format('DD-MM-YYYY')} a les{' '}
					{dayjs(element.fromDate).format('HH:MM')}
				</small>
			</span>
			<span>
				<small>
					Fins el {dayjs(element.toDate).format('DD-MM-YYYY')} a les{' '}
					{dayjs(element.toDate).format('HH:MM')}
				</small>
			</span>
		</Card.Text>
	) : (
		<></>
	);
	const location =
		element.location && showLocation ? (
			<LocationIcon location={element.location} />
		) : (
			<></>
		);

	const buttons = showButtons ? (
		<Card.Footer className="bg-success text-white">
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
				<PeopleIcon
					type="activity"
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
		<Card border="success" className="cardElement">
			<Card.Body onClick={() => handleDetail(element._id)}>
				{image}
				<Card.Title>{element.name}</Card.Title>
				{description}
				{dates}
			</Card.Body>
			{buttons}
		</Card>
	);
}

export default ActivityCard;
