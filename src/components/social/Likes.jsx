import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiFillLike } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
import CommentService from '../../services/comment/CommentService';
import ImageService from '../../services/image/ImageService';

function Likes(props) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = async () => {
		if (props.user) {
			console.log('like');
			switch (props.type) {
				case 'event':
					await EventService.like(props.id);
					break;
				case 'activity':
					await ActivityService.like(props.id);
					break;
				case 'comment':
					await CommentService.like(props.id);
					break;
				case 'image':
					await ImageService.like(props.id);
					break;
			}
			props.onClick();
		} else {
			setShowModal(true);
		}
	};
	const handleClose = () => {
		setShowModal(false);
	};
	return (
		<div
			className="d-flex flex-row justify-content-between align-items-center"
			onClick={handleClick}
		>
			<AiFillLike />
			{props.quantity}
			<Modal
				show={showModal}
				onHide={handleClose}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>¡¡¡ Vaja no estàs autenticat !!!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Per poder realitzar aquesta acció abans t'has de{' '}
					<Link to="/login">autenticar</Link> o{' '}
					<Link to="/signup">registrar</Link> !!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Tanca
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Likes;
