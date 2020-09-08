import React from 'react';
import { AiFillDislike } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
function DisLikes(props) {
	return (
		<div className="d-flex flex-row justify-content-between align-items-center">
			<AiFillDislike />
			{props.quantity}
		</div>
	);
}

export default DisLikes;
