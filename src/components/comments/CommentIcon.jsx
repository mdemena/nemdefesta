import React, { useState } from 'react';
import {
	Modal,
	ListGroup,
	Badge,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';
import CommentCard from './CommentCard';

function CommentIcon(props) {
	const [showComments, setShowComments] = useState(false);
	const handleClick = () => {
		props.onClick();
	};
	const handleShow = () => {
		if (props.array.length > 0) setShowComments(!showComments);
	};
	const comments = props.array.map((comment) => (
		<ListGroup.Item key={comment._id} className="pl-0 pr-0">
			<CommentCard
				user={props.user}
				comment={comment}
				onClick={handleClick}
			></CommentCard>
		</ListGroup.Item>
	));
	return (
		<div>
			<OverlayTrigger
				key={props.id}
				placement="left"
				overlay={
					<Tooltip id={`tooltip-comment`}>
						<strong>Comentaris</strong>.
					</Tooltip>
				}
			>
				<div
					className="d-flex flex-row justify-content-between align-items-center"
					onClick={handleShow}
				>
					<BiCommentDetail />
					<Badge variant="light">{props.array.length}</Badge>
				</div>
			</OverlayTrigger>
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
