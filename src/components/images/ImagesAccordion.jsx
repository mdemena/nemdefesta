import React, { useState } from 'react';
import { Accordion, Modal, Button, Card, ListGroup } from 'react-bootstrap';
import { BiImages, BiImageAdd } from 'react-icons/bi';
import ImageCard from '../images/ImageCard';
import ImageForm from '../images/ImageForm';

function ImagesAccordion(props) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		props.onClick();
	};
	const handleSubmitImage = () => {
		handleClose();
		handleClick();
	};
	const handleAdd = () => {
		setShowModal(true);
	};
	const handleClose = () => {
		setShowModal(!showModal);
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
	const addButton = props.user ? (
		<div className="d-flex flex-row justify-content-around align-item-center">
			<span>Puja la teva imatge !!!</span>{' '}
			<Button className="btn btn-success text-white" onClick={handleAdd}>
				<BiImageAdd size="20px" />
				<small>Publica</small>
			</Button>
		</div>
	) : (
		<></>
	);
	return (
		<>
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
					<div className="d-flex flex-row justify-content-between align-items-center">
						{props.images.length} Imatges
						<BiImages size="20px" />
					</div>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={props.eventKey}>
					<Card.Body>
						{addButton}
						<ListGroup variant="flush">{images}</ListGroup>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Nova imatge</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ImageForm
						user={props.user}
						event={props.event}
						activity={props.activity}
						onClick={handleSubmitImage}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ImagesAccordion;
