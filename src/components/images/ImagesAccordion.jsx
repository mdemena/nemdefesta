import React from 'react';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import { BsImages } from 'react-icons/bs';
import ImageCard from '../images/ImageCard';

function ImagesAccordion(props) {
	const handleClick = () => {
		props.onClick();
	};
	const images = props.images.map((image) => (
		<ListGroup.Item key={image._id} className="pl-0 pr-0">
			<ImageCard
				user={props.user}
				image={image}
				onClick={handleClick}
			></ImageCard>
		</ListGroup.Item>
	));
	return (
		<Card>
			<Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
				<div className="d-flex flex-row justify-content-between align-items-center">
					{props.images.length} Imatges
					<BsImages size="20px" />
				</div>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey={props.eventKey}>
				<Card.Body>
					<ListGroup variant="flush">{images}</ListGroup>
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}

export default ImagesAccordion;
