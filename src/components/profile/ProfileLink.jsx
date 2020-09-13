import React, { useState } from 'react';
import { Modal, Badge } from 'react-bootstrap';
import ProfileDetail from './ProfileDetail';

function ProfileLink(props) {
	const [showProfile, setShowProfile] = useState(false);
	const handleShow = () => {
		setShowProfile(!showProfile);
	};
	return (
		<>
			<Badge variant="light" onClick={handleShow}>
				{props.profile.username}
			</Badge>
			<Modal show={showProfile} onHide={handleShow}>
				<Modal.Header closeButton>
					<Modal.Title>Perfil de {props.profile.username}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ProfileDetail id={props.profile._id} />
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ProfileLink;
