import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import MapCard from '../maps/MapCard';
import { BsGeo } from 'react-icons/bs';

function MapAccordion(props) {
	const activitiesMap = props.locations;
	const activitiesMapCenter = {
		lat: props.centerLat,
		lng: props.centerLng,
	};
	return (
		<Card>
			<Accordion.Toggle as={Card.Header} eventKey="1">
				<div className="d-flex flex-row justify-content-between align-items-center">
					{props.title}
					<BsGeo size="20px" />
				</div>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey="1">
				<Card.Body>
					<MapCard
						center={activitiesMapCenter}
						points={activitiesMap}
						zoom={14}
					/>
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}

export default MapAccordion;
