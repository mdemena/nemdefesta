import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function EventInfoWindow(props) {
	const element = props.event;

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

export default EventInfoWindow;
