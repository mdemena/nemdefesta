import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function MapCard(props) {
	const center = props.center;
	const zoom = props.zoom || 17;
	const containerStyle = {
		minWidth: '100%',
		width: '100%',
		minHeight: '100%',
		height: '300px',
		overflow: 'auto',
	};
	const makers = props.points.map((elem) => (
		<Marker
			key={elem._id}
			position={{
				lat: elem.gpsLocation.coordinates[0],
				lng: elem.gpsLocation.coordinates[1],
			}}
		/>
	));
	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
				{makers}
			</GoogleMap>
		</LoadScript>
	);
}

export default MapCard;
