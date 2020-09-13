import React, { useState } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AiTwotoneDelete } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
import CommentService from '../../services/comment/CommentService';
import ImageService from '../../services/image/ImageService';

function DeleteIcon(props) {
	const [showConfirm, setShowConfirm] = useState(false);
	const handleShow = () => {
		setShowConfirm(!showConfirm);
	};

	const handleClick = async (event) => {
		switch (props.type) {
			case 'event':
				await EventService.delete(props.id);
				break;
			case 'activity':
				await ActivityService.delete(props.id);
				break;
			case 'comment':
				await CommentService.delete(props.id);
				break;
			case 'image':
				await ImageService.delete(props.id);
				break;
			default:
				break;
		}
		handleShow();
		props.onClick();
	};
	const objectName = () => {
		switch (props.type) {
			case 'event':
				return 'event';
			case 'activity':
				return 'activitat';
			case 'comment':
				return 'comentari';
			case 'image':
				return 'amatge';
			default:
				return 'a saber..';
		}
	};
	return (
		<>
			<OverlayTrigger
				key={props.id}
				placement="left"
				overlay={
					<Tooltip id={`tooltip-delete`}>
						<strong>Eliminar {objectName()}</strong>.
					</Tooltip>
				}
			>
				<AiTwotoneDelete onClick={handleShow} />
			</OverlayTrigger>
			<Modal show={showConfirm} onHide={handleShow} centered>
				<Modal.Header closeButton>
					<Modal.Title>Eliminar {objectName()}</Modal.Title>
				</Modal.Header>
				<Modal.Body>Segur que ho vols eliminar?</Modal.Body>
				<Modal.Footer>
					<Button variant="success" onClick={handleShow}>
						No
					</Button>
					<Button variant="danger" onClick={handleClick}>
						Eliminar
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default DeleteIcon;
