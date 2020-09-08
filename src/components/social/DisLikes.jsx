import React from 'react';
import { AiFillDislike } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
import CommentService from '../../services/comment/CommentService';
import ImageService from '../../services/image/ImageService';

function DisLikes(props) {
	const handleClick = async () => {
		console.log('Unlike');
		switch (props.type) {
			case 'event':
				await EventService.unlike(props.id);
				break;
			case 'activity':
				await ActivityService.unlike(props.id);
				break;
			case 'comment':
				await CommentService.unlike(props.id);
				break;
			case 'image':
				await ImageService.unlike(props.id);
				break;
		}
		props.onClick();
	};
	return (
		<div
			className="d-flex flex-row justify-content-between align-items-center"
			onClick={props.user ? handleClick : null}
		>
			<AiFillDislike />
			{props.quantity}
		</div>
	);
}

export default DisLikes;
