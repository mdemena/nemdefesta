import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';
import EventInfoWindow from '../events/EventInfoWindow';
import { Spinner } from 'react-bootstrap';

function Map(props) {
	const [center, setCenter] = useState({ lat: 0, lng: 0 });
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
		googleMapsClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
		language: 'es',
	});
	const points = JSON.parse(localStorage.getItem('events')) || [];

	useEffect(() => {
		if (points.length > 0) {
			setCenter({
				lat: points[0].location.gpsLocation.coordinates[0],
				lng: points[0].location.gpsLocation.coordinates[1],
			});
		}
	}, []);

	const makers = points.map((elem) => (
		<InfoWindow
			key={elem._id}
			position={{
				lat: elem.location.gpsLocation.coordinates[0],
				lng: elem.location.gpsLocation.coordinates[1],
			}}
		>
			<EventInfoWindow event={elem} user={props.user} />
		</InfoWindow>
		// <Marker
		// 	key={elem._id}
		// 	position={{
		// 		lat: elem.location.gpsLocation.coordinates[0],
		// 		lng: elem.location.gpsLocation.coordinates[1],
		// 	}}
		// />
	));

	const containerStyle = {
		minWidth: '100%',
		width: '100%',
		minHeight: '100%',
		height: '100%',
		overflow: 'auto',
	};
	if (!isLoaded) {
		return <Spinner variant="success" />;
	}
	if (loadError) {
		return <div>El mapa no es pot carregar ara.</div>;
	}
	return (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
			{makers}
		</GoogleMap>
	);
}

export default Map;
