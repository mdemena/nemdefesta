import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import EventInfoWindow from '../events/EventInfoWindow';

function Map(props) {
	const [center, setCenter] = useState({ lat: 0, lng: 0 });
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
	return (
		<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
			<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
				{/* <MarkerClusterer>
					{(clusterer) =>
						points.map((elem) => (
							<Marker
								key={elem._id}
								position={{
									lat: elem.location.gpsLocation.coordinates[0],
									lng: elem.location.gpsLocation.coordinates[1],
								}}
								clusterer={clusterer}
							/>
						))
					}
				</MarkerClusterer> */}
				{makers}
			</GoogleMap>
		</LoadScript>
	);
}

export default Map;
