import React, { useState } from 'react';
import {
	Container,
	Image,
	FormControl,
	InputGroup,
	Spinner,
	Modal,
	Button,
} from 'react-bootstrap';

import UserService from '../../../services/user/UserService';
import AuthService from '../../../services/auth/AuthService';

function Avatar(props) {
	const userService = new UserService();
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(props.image);
	const [showUpload, setShowUpload] = useState(false);
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		props.readOnly ? setShow(false) : setShow(true);
	};

	const handleChange = (event) => {
		const imageFile = event.target.files[0];
		setImage(imageFile);
	};
	const handleSave = (event) => {
		handleClose();
		setLoading(true);
		// const imageFile = event.target.files[0];
		AuthService.loggedin().then((logged) => {
			if (logged) {
				userService.upload(image).then((response) => {
					props.onUpload(response.image);
					setLoading(false);
				});
			}
		});
	};
	if (loading) {
		return (
			<Spinner animation="border" variant="success" size="lg" role="status">
				<span className="sr-only">Carregant...</span>
			</Spinner>
		);
	} else if (showUpload) {
		return (
			<InputGroup className="mb-3">
				<FormControl
					id="imatge"
					name="imatge"
					type="file"
					onChange={handleChange}
					placeholder="Fitxer de la imatge"
					aria-label="Fitxer de la imatge"
					aria-describedby="image-text"
				/>
			</InputGroup>
		);
	}
	return (
		<Container fluid className="d-flex flex-column align-items-center w-100">
			<Image
				src={props.image}
				alt={props.image}
				className="avatar"
				fluid
				roundedCircle
				thumbnail
				onClick={handleShow}
			/>
			<Modal
				show={show}
				onHide={handleClose}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Selecciona una imatge</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<InputGroup className="mb-3">
						<FormControl
							id="imatge"
							name="imatge"
							type="file"
							onChange={handleChange}
							placeholder="Fitxer de la imatge"
							aria-label="Fitxer de la imatge"
							aria-describedby="image-text"
						/>
					</InputGroup>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Tanca
					</Button>
					<Button variant="primary" onClick={handleSave}>
						Selecciona
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default Avatar;
