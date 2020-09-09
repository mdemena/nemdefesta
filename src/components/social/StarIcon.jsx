import React, { useState, useRef } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import { AiFillStar, AiOutlineStar, AiFillAlert } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import EventService from '../../services/event/EventService';
import ActivityService from '../../services/activity/ActivityService';

function StarIcon(props) {
	const [showInfo, setShowInfo] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleClick = async (event) => {
		if (props.user) {
			console.log('Star');
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
		<div
			className="d-flex flex-row justify-content-between align-items-center"
			onClick={handleClick}
		>
			<AiOutlineStar />
			<span>Assistiràs?</span>
		</div>
	);
	return (
		<div ref={ref}>
			{star}
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
					<Popover.Title as="h3" className="bg-warning">
						<AiFillAlert className="rounded mr-2" />
						<strong className="mr-auto">¡¡¡ No estàs autenticat !!!</strong>
					</Popover.Title>
					<Popover.Content>
						Pots <Link to="/login">accedir</Link> o{' '}
						<Link to="/signup">registrar-te</Link>
					</Popover.Content>
				</Popover>
			</Overlay>
		</div>
	);
}

export default StarIcon;
