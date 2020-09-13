import React, { useState, useRef } from 'react';
import { Popover, Overlay, Badge } from 'react-bootstrap';
import { AiFillDislike } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
import CommentService from '../../services/comment/CommentService';
import ImageService from '../../services/image/ImageService';
import PopOverNoLogged from '../popovers/PopOverNoLogged';

function DisLikeIcon(props) {
	const [showInfo, setShowInfo] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleClick = async (event) => {
		if (props.user) {
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
				default:
					break;
			}
			props.onClick();
		} else {
			setShowInfo(!showInfo);
			setTarget(event.target);
		}
	};
	const handleClose = () => {
		setShowInfo(false);
	};
	return (
		<div ref={ref}>
			<div
				className="d-flex flex-row justify-content-between align-items-center"
				onClick={handleClick}
			>
				<AiFillDislike />
				<Badge variant="light">{props.quantity}</Badge>
			</div>
			<Overlay
				show={showInfo}
				target={target}
				container={ref.current}
				containerPadding={20}
				placement="top"
				rootClose={true}
				onHide={handleClose}
			>
				<Popover id="popover-contained">
					<PopOverNoLogged />
				</Popover>
			</Overlay>
		</div>
	);
}

export default DisLikeIcon;
