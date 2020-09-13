import React, { useState, useRef } from 'react';
import {
	Popover,
	Overlay,
	Badge,
	OverlayTrigger,
	Tooltip,
} from 'react-bootstrap';
import { AiFillLike } from 'react-icons/ai';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
import CommentService from '../../services/comment/CommentService';
import ImageService from '../../services/image/ImageService';
import PopOverNoLogged from '../popovers/PopOverNoLogged';

function LikeIcon(props) {
	const [showInfo, setShowInfo] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleClick = async (event) => {
		if (props.user) {
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
			<OverlayTrigger
				key={props.id}
				placement="right"
				overlay={
					<Tooltip id={`tooltip-like`}>
						<strong>M'agrada</strong>.
					</Tooltip>
				}
			>
				<div
					className="d-flex flex-row justify-content-between align-items-center"
					onClick={handleClick}
					alt="M'agrada"
				>
					<AiFillLike />
					<Badge variant="light">{props.quantity}</Badge>
				</div>
			</OverlayTrigger>
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

export default LikeIcon;
