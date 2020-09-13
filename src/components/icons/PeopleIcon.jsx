import React, { useState, useRef } from 'react';
import { Overlay, Badge } from 'react-bootstrap';
import { BsPeopleFill, BsPeople } from 'react-icons/bs';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';
import PopOverNoLogged from '../popovers/PopOverNoLogged';
import { Popover } from 'react-bootstrap';

function PeopleIcon(props) {
	const [showInfo, setShowInfo] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleClick = async (event) => {
		if (props.user) {
			switch (props.type) {
				case 'event':
					await EventService.attendee(props.id);
					break;
				case 'activity':
					await ActivityService.attendee(props.id);
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
	const starIcon = props.user ? (
		props.array.includes(props.user._id) ? (
			<BsPeopleFill />
		) : (
			<BsPeople />
		)
	) : (
		<BsPeople />
	);
	return (
		<div ref={ref}>
			<div
				className="d-flex flex-row justify-content-between align-items-center"
				onClick={handleClick}
			>
				{starIcon}
				<Badge variant="light">{props.array.length}</Badge>
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

export default PeopleIcon;
