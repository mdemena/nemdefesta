import React from 'react';
import { Card } from 'react-bootstrap';
import LikeIcon from '../social/LikeIcon';
import DisLikeIcon from '../social/DisLikeIcon';
import StarIcon from '../social/StarIcon';
import CommentIcon from '../comments/CommentIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function ImageCard(props) {
	const element = props.image;

	const handleClick = () => {
		props.onClick();
	};
	return (
		<Card className="bg-success text-white" border="success">
			<Card.Body>
				<Card.Img src={element.image} alt={element.title} />
				<Card.ImgOverlay>
					<Card.Title>{element.title}</Card.Title>
					<Card.Text>{element.description}</Card.Text>
					<Card.Text>
						<small>
							Publicada el {dayjs(element.createAt).format('DD-MM-YYYY')}
						</small>
					</Card.Text>
				</Card.ImgOverlay>
			</Card.Body>
			<Card.Footer>
				<div className="d-flex flex-row justify-content-around align-items-center">
					<LikeIcon
						type="image"
						id={element._id}
						quantity={element.likes.length}
						user={props.user}
						onClick={handleClick}
					/>
					<DisLikeIcon
						type="image"
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

export default ImageCard;