import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';

function Star(props) {
	const handleClick = async () => {
		console.log('Star');
		switch (props.type) {
			case 'event':
				await EventService.attendee(props.id);
				break;
			case 'activity':
				await ActivityService.attendee(props.id);
				break;
		}
		props.onClick();
	};
	const star = props.user ? (
		props.array.includes(props.user._id) ? (
			<div
				className="d-flex flex-row justify-content-between align-items-center"
				onClick={handleClick}
			>
				<AiFillStar />
				<span>¡Assistiràs!</span>
			</div>
		) : (
			<div
				className="d-flex flex-row justify-content-between align-items-center"
				onClick={handleClick}
			>
				<AiOutlineStar />
				<span>Assistiràs?</span>
			</div>
		)
	) : (
		<div className="d-flex flex-row justify-content-between align-items-center">
			<AiOutlineStar />
			<span>Assistiràs?</span>
		</div>
	);
	return <>{star}</>;
}

export default Star;
