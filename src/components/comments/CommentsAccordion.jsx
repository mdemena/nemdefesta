import React, { useState } from 'react';
import { Accordion, Modal, Button, Card, ListGroup } from 'react-bootstrap';
import { BiCommentDetail, BiCommentAdd } from 'react-icons/bi';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

function CommentsAccordion(props) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		props.onClick();
	};
	const handleSubmitComment = () => {
		handleClose();
		handleClick();
	};
	const handleAdd = () => {
		setShowModal(true);
	};
	const handleClose = () => {
		setShowModal(!showModal);
	};
	const comments = props.comments.map((comment) => (
		<ListGroup.Item key={comment._id} className="pl-0 pr-0">
			<CommentCard
				user={props.user}
				comment={comment}
				onClick={handleClick}
			></CommentCard>
		</ListGroup.Item>
	));
	const addButton = props.user ? (
		<div className="d-flex flex-row justify-content-around align-item-center">
			<span>Deixa el teu comentari!!!</span>{' '}
			<Button className="btn btn-success text-white" onClick={handleAdd}>
				<BiCommentAdd size="20px" />
				<small>Afegeix</small>
			</Button>
		</div>
	) : (
		<></>
	);
	return (
		<>
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey="2">
					<div className="d-flex flex-row justify-content-between align-items-center">
						{props.comments.length} Comentaris
						<BiCommentDetail size="20px" />
					</div>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey="2">
					<Card.Body>
						{addButton}
						<ListGroup variant="flush">{comments}</ListGroup>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Nou comentari</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<CommentForm
						user={props.user}
						event={props.event}
						activity={props.activity}
						onClick={handleSubmitComment}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default CommentsAccordion;
