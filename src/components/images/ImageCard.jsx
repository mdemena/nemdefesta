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
	const deleteIcon =
		props.user && props.user._id === element.user._id ? (
			<DeleteIcon type="image" id={element._id} onClick={handleClick} />
		) : (
			<></>
		);

	return (
		<Card className="cardElement" border="success">
			<Card.Body>
				<Card.Title>{element.title}</Card.Title>
				<Card.Img src={element.image} alt={element.title} />
				<Card.Text className="pt-2">{element.description}</Card.Text>
				<Card.Text>
					<small>
						Publicada el {dayjs(element.createAt).format('DD-MM-YYYY')} a les{' '}
						{dayjs(element.createAt).format('HH:MM')}
					</small>
				</Card.Text>
			</Card.Body>
			<Card.Footer className="bg-success text-white">
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
