import React, { useState, useEffect } from 'react';
import {
	GoogleMap,
	LoadScript,
	Marker,
	MarkerClusterer,
	InfoWindow,
} from '@react-google-maps/api';
import ExentInfoWindow from '../events/ExentInfoWindow';

function Map(props) {
	const [center, setCenter] = useState({ lat: 0, lng: 0 });
	const points = JSON.parse(sessionStorage.getItem('events'));
	console.log('Points', points);

	useEffect(() => {
		if (points.length > 0) {
			setCenter({
				lat: points[0].location.gpsLocation.coordinates[0],
				lng: points[0].location.gpsLocation.coordinates[1],
			});
		}
	}, []);

	const makers = points.map((elem, index) => (
		<InfoWindow
			key={elem._id}
			position={{
				lat: elem.location.gpsLocation.coordinates[0],
				lng: elem.location.gpsLocation.coordinates[1],
			}}
		>
			<ExentInfoWindow event={elem} user={props.user} />
		</InfoWindow>
		// <Marker
		// 	key={elem._id}
		// 	position={{
		// 		lat: elem.location.gpsLocation.coordinates[0],
		// 		lng: elem.location.gpsLocation.coordinates[1],
		// 	}}
		// />
	));

	console.log('GOOGLE_API_KEY', process.env.GOOGLE_API_KEY);
	console.log('Center', center);
	const containerStyle = {
		minWidth: '100%',
		width: '100%',
		minHeight: '100%',
		height: '100%',
		overflow: 'auto',
	};
	return (
		<LoadScript googleMapsApiKey="AIzaSyDf8lFaNmy0tTkfhhBgiJHR4N_yO_8Sfps">
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
