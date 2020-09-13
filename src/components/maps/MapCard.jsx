import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { Spinner } from 'react-bootstrap';

const containerStyle = {
	minWidth: '100%',
	width: '100%',
	minHeight: '100%',
	height: '300px',
	overflow: 'auto',
};

function MapCard(props) {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
		googleMapsClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
		language: 'es',
	});

	// const options = {
	// 	mapTypeControlOptions: {
	// 		style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU,
	// 		mapTypeIds: ['roadmap', 'terrain', 'satellite'],
	// 	},
	// 	fullscreenControl: false,
	// };
	const center = props.center;
	const zoom = props.zoom || 17;

	const makers = props.points.map((elem) => (
		<Marker
			key={elem._id}
			position={{
				lat: elem.gpsLocation.coordinates[0],
				lng: elem.gpsLocation.coordinates[1],
			}}
		/>
	));
	if (!isLoaded) {
		return <Spinner variant="success" />;
	}
	if (loadError) {
		return <div>El mapa no es pot carregar ara.</div>;
	}
	return (
		// <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
			{makers}
		</GoogleMap>
		// </LoadScript>
	);
}

export default MapCard;
