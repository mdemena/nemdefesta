import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import ActivityService from '../../services/activity/ActivityService';
import CommentCard from '../comments/CommentCard';
import ActivityCard from '../activities/ActivityCard';
import MapCard from '../maps/MapCard';
import ImageCard from '../images/ImageCard';
import { BiCommentDetail } from 'react-icons/bi';
import { BsGeo, BsImages } from 'react-icons/bs';

require('dayjs/locale/es');

const initialState = {
	location: { gpsLocation: { coordinates: [0, 0] } },
	images: [],
	likes: [],
	unlikes: [],
	comments: [],
	attendees: [],
};

function ActivityDetail(props) {
	const { id } = useParams();
	const [element, setElement] = useState(initialState);

	const getActivity = (id) => {
		ActivityService.get(id).then((response) => setElement(response));
	};

	useEffect(() => {
		getActivity(id);
	}, []);

	const handleClick = () => {
		getActivity(id);
	};
	const comments = element.comments.map((comment) => (
		<ListGroup.Item key={comment._id} className="pl-0 pr-0">
			<CommentCard
				user={props.user}
				comment={comment}
				onClick={handleClick}
			></CommentCard>
		</ListGroup.Item>
	));

	const images = element.images.map((image) => (
		<ListGroup.Item key={image._id} className="pl-0 pr-0">
			<ImageCard
				user={props.user}
				image={image}
				onClick={handleClick}
			></ImageCard>
		</ListGroup.Item>
	));
	const activityMapCenter = {
		lat: element.location.gpsLocation.coordinates[0],
		lng: element.location.gpsLocation.coordinates[1],
	};
	const activityPoints = [element.location];
	return (
		<>
			<ActivityCard
				user={props.user}
				activity={element}
				onClick={handleClick}
				showLocation={false}
			></ActivityCard>
			<Accordion defaultActiveKey="1" className="mt-2">
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="1">
						<div className="d-flex flex-row justify-content-between align-items-center">
							On es celebra?
							<BsGeo size="20px" />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="1">
						<Card.Body>
							<MapCard
								center={activityMapCenter}
								points={activityPoints}
								zoom={15}
							/>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="2">
						<div className="d-flex flex-row justify-content-between align-items-center">
							S'han realizat {element.comments.length} comentaris
							<BiCommentDetail size="20px" />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="2">
						<Card.Body>
							<ListGroup variant="flush">{comments}</ListGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
				<Card>
					<Accordion.Toggle as={Card.Header} eventKey="3">
						<div className="d-flex flex-row justify-content-between align-items-center">
							Tenim {element.images.length} imatges
							<BsImages size="20px" />
						</div>
					</Accordion.Toggle>
					<Accordion.Collapse eventKey="3">
						<Card.Body>
							<ListGroup variant="flush">{images}</ListGroup>
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>
		</>
	);
}

export default ActivityDetail;
