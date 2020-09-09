import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LikeIcon from '../social/LikeIcon';
import DisLikeIcon from '../social/DisLikeIcon';
import StarIcon from '../social/StarIcon';
import CommentIcon from '../comments/CommentIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function ExentInfoWindow(props) {
	const element = props.event;

	const handleClick = () => {
		props.onClick();
	};
	return (
		<Card className="bg-success text-white mb" border="success">
			<Link to={'/events/' + element._id} className="text-white">
				<Card.Body>
					<Card.Title>{element.name}</Card.Title>
					<Card.Text>
						Desde: {dayjs(element.fromDate).format('DD-MM-YYYY')}
						<br />
						Fins: {dayjs(element.toDate).format('DD-MM-YYYY')}
					</Card.Text>
				</Card.Body>
			</Link>
		</Card>
	);
}

export default ExentInfoWindow;
