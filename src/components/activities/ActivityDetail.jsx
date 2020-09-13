import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import ActivityService from '../../services/activity/ActivityService';
import ActivityCard from '../activities/ActivityCard';
import MapAccordion from '../maps/MapAccordion';
import CommentsAccordion from '../comments/CommentsAccordion';
import ImagesAccordion from '../images/ImagesAccordion';

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
	return (
		<>
			<ActivityCard
				user={props.user}
				activity={element}
				onClick={handleClick}
				showImage={false}
				showLocation={false}
			></ActivityCard>
			<Accordion defaultActiveKey="1" className="mt-2">
				<MapAccordion
					title="On es celebra?"
					locations={[element.location]}
					user={props.user}
					activity={element._id}
					eventKey={1}
					centerLat={element.location.gpsLocation.coordinates[0]}
					centerLng={element.location.gpsLocation.coordinates[1]}
					onClick={handleClick}
				/>
				<CommentsAccordion
					comments={element.comments}
					user={props.user}
					activity={element._id}
					eventKey={2}
					onClick={handleClick}
				/>
				<ImagesAccordion
					images={element.images}
					user={props.user}
					activity={element._id}
					eventKey={3}
					onClick={handleClick}
				/>
			</Accordion>
		</>
	);
}

export default ActivityDetail;
