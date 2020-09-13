import React from 'react';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import { MdLocalActivity } from 'react-icons/md';
import ActivityCard from '../activities/ActivityCard';

function ActivitiesAccordion(props) {
	const handleClick = () => {
		props.onClick();
	};
	const activities = props.activities.map((activity) => (
		<ListGroup.Item key={activity._id} className="pl-0 pr-0">
			<ActivityCard
				user={props.user}
				activity={activity}
				onClick={handleClick}
				showLocation
			></ActivityCard>
		</ListGroup.Item>
	));
	return (
		<Card>
			<Accordion.Toggle as={Card.Header} eventKey="0">
				<div className="d-flex flex-row justify-content-between align-items-center">
					{props.activities.length} Activitats
					<MdLocalActivity size="20px" />
				</div>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey="0">
				<Card.Body>
					<ListGroup variant="flush">{activities}</ListGroup>
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}

export default ActivitiesAccordion;
