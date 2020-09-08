import React, { useReducer } from 'react';
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

const avatarReducer = (state, action) => {
	switch (action.type) {
		case 'field':
			return { ...state, [action.fieldName]: action.fieldValue };
		case 'openModal':
			return { ...state, isShowing: true };
		case 'closeModal':
			return { ...state, isShowing: false };
		case 'loading':
			return { ...state, isLoading: true };
		case 'notLoading':
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

function Avatar(props) {
	const initialState = {
		image: props.image,
		isLoading: false,
		isShowing: false,
	};
	const [state, dispatch] = useReducer(avatarReducer, initialState);

	const handleClose = () => dispatch({ type: 'closeModal' });
	const handleShow = () =>
		dispatch({ type: props.readOnly ? 'closeModal' : 'openModal' });

	const handleChange = (event) => {
		const imageFile = event.target.files[0];
		dispatch({ type: 'field', fieldName: 'image', fieldValue: imageFile });
	};
	const handleSave = (event) => {
		handleClose();
		dispatch({ type: 'loading' });
		AuthService.loggedin().then((logged) => {
			if (logged) {
				UserService.upload(state.image).then((response) => {
					props.onUpload(response);
					dispatch({ type: 'notLoading' });
				});
			}
		});
	};
	if (state.isLoading) {
		return (
			<Spinner animation="border" variant="success" size="lg" role="status">
				<span className="sr-only">Carregant...</span>
			</Spinner>
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
				show={state.isShowing}
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
