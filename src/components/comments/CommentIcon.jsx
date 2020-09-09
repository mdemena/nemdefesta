import React, { useState } from 'react';
import { Modal, ListGroup } from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';
import CommentCard from './CommentCard';

function CommentIcon(props) {
	const [showComments, setShowComments] = useState(false);
	const handleClick = () => {
		props.onClick();
	};
	const handleShow = () => {
		setShowComments(!showComments);
	};
	const comments = props.array.map((comment) => (
		<ListGroup.Item key={comment._id}>
			<CommentCard
				user={props.user}
				comment={comment}
				onClick={handleClick}
			></CommentCard>
		</ListGroup.Item>
	));
	return (
		<div>
			<div
				className="d-flex flex-row justify-content-between align-items-center"
				onClick={handleShow}
			>
				<BiCommentDetail /> {props.array.length}
			</div>
			<Modal show={showComments} onHide={handleShow}>
				<Modal.Header closeButton>
					<Modal.Title>Comentaris</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListGroup variant="flush">{comments}</ListGroup>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default CommentIcon;
