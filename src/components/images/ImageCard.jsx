import React from 'react';
import { Card } from 'react-bootstrap';
import LikeIcon from '../icons/LikeIcon';
import DisLikeIcon from '../icons/DisLikeIcon';
import DeleteIcon from '../icons/DeleteIcon';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function ImageCard(props) {
	const element = props.image;

	const handleClick = () => {
		props.onClick();
	};
	const deleteIcon = () => {
		return props.user._id === element._id ? (
			<DeleteIcon type="image" id={element._id} onClick={handleClick} />
		) : (
			<></>
		);
	};
	return (
		<Card className="bg-success text-white" border="success">
			<Card.Body>
				<Card.Title>{element.title}</Card.Title>
				<Card.Img src={element.image} alt={element.title} />
				<Card.Text>{element.description}</Card.Text>
				<Card.Text>
					<small>
						Publicada el {dayjs(element.createAt).format('DD-MM-YYYY')} a les{' '}
						{dayjs(element.createAt).format('HH:MM')}
					</small>
				</Card.Text>
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
					{deleteIcon}
				</div>
			</Card.Footer>
		</Card>
	);
}

export default ImageCard;
