import React from 'react';
import { Card } from 'react-bootstrap';
import Likes from '../icons/LikeIcon';
import DisLikes from '../icons/DisLikeIcon';
import DeleteIcon from '../icons/DeleteIcon';
import ProfileLink from '../profile/ProfileLink';
import dayjs from 'dayjs';

require('dayjs/locale/es');

function CommentCard(props) {
	const element = props.comment;

	const handleClick = () => {
		props.onClick();
	};

	const deleteIcon =
		props.user && props.user._id === element.user._id ? (
			<DeleteIcon type="comment" id={element._id} onClick={handleClick} />
		) : (
			<></>
		);
	return (
		<Card className="bg-success text-white" border="success">
			<Card.Body>
				<Card.Title>{element.title}</Card.Title>
				<Card.Text>{element.description}</Card.Text>
				<Card.Text>
					<small>
						Comentari de <ProfileLink profile={element.user} /> realitzat el{' '}
						{dayjs(element.createdAt).format('DD-MM-YYYY HH:MM')}
					</small>
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
					{deleteIcon}
				</div>
			</Card.Footer>
		</Card>
	);
}

export default CommentCard;
