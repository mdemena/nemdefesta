import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Likes from '../social/LikeIcon';
import DisLikes from '../social/DisLikeIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function CommentCard(props) {
	const element = props.comment;

	const handleClick = () => {
		props.onClick();
	};
	return (
		<Card className="bg-success text-white" border="success">
			<Card.Body>
				<Card.Title>{element.title}</Card.Title>
				<Card.Text>{element.description}</Card.Text>
				<Card.Text>
					Comentari de:{' '}
					<Link to={'/profile/' + element.user._id}>
						{element.user.username}
					</Link>{' '}
					realitzat el {dayjs(element.createdAt).format('DD-MM-YYYY HH:MM')}
				</Card.Text>
			</Card.Body>
			<Card.Footer>
				<div className="d-flex flex-row justify-content-around align-items-center">
					<Likes
						type="comment"
						id={element._id}
						quantity={element.likes.length}
						user={props.user}
						onClick={handleClick}
					/>
					<DisLikes
						type="comment"
						id={element._id}
						quantity={element.unlikes.length}
						user={props.user}
						onClick={handleClick}
					/>
				</div>
			</Card.Footer>
		</Card>
	);
}

export default CommentCard;
