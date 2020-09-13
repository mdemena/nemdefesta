import React from 'react';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import { BiCommentDetail } from 'react-icons/bi';
import CommentCard from '../comments/CommentCard';

function CommentsAccordion(props) {
	const handleClick = () => {
		props.onClick();
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
	return (
		<Card>
			<Accordion.Toggle as={Card.Header} eventKey="2">
				<div className="d-flex flex-row justify-content-between align-items-center">
					{props.comments.length} Comentaris
					<BiCommentDetail size="20px" />
				</div>
			</Accordion.Toggle>
			<Accordion.Collapse eventKey="2">
				<Card.Body>
					<ListGroup variant="flush">{comments}</ListGroup>
				</Card.Body>
			</Accordion.Collapse>
		</Card>
	);
}

export default CommentsAccordion;
