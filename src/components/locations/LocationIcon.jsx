import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsGeoAlt } from 'react-icons/bs';
import MapCard from '../maps/MapCard';

function LocationIcon(props) {
	const [showMap, setShowMap] = useState(false);
	const handleShow = () => {
		setShowMap(!showMap);
	};
	return (
		<div>
			<div
				className="d-flex flex-row justify-content-between align-items-center"
				onClick={handleShow}
			>
				<BsGeoAlt />
			</div>
			<Modal show={showMap} onHide={handleShow} centered>
				<Modal.Header closeButton>
					<Modal.Title>{props.location.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<MapCard
						center={{
							lat: props.location.gpsLocation.coordinates[0],
							lng: props.location.gpsLocation.coordinates[1],
						}}
						points={[props.location]}
					/>
				</Modal.Body>
			</Modal>
		</div>
	);
}

export default LocationIcon;
