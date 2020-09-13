import React, { useState, useRef } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
import CommentService from '../../services/comment/CommentService';
import ImageService from '../../services/image/ImageService';

function DeleteIcon(props) {
	const [showInfo, setShowInfo] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

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
		props.onClick();
	};
	return <AiTwotoneDelete onClick={handleClick} />;
}

export default DeleteIcon;
