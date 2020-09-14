import React, { useReducer } from 'react';
import {
	Button,
	Form,
	FormControl,
	InputGroup,
	Alert,
	FormFile,
} from 'react-bootstrap';
import ImageService from '../../services/image/ImageService';

const imageReducer = (state, action) => {
	switch (action.type) {
		case 'field':
			return { ...state, [action.fieldName]: action.fieldValue };
		case 'alert':
			const { alertMessages } = state;
			alertMessages.push(action.alertMessage);
			return { ...state, showAlert: true, alertMessages: alertMessages };
		case 'resetAlert':
			return {
				...state,
				showAlert: false,
				alertMessages: [],
			};
		case 'closeAlert':
			return { ...state, showAlert: false, alertMessages: [] };
		case 'loading':
			return { ...state, isLoading: true };
		case 'notLoading':
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

function ImageForm(props) {
	const initialState = {
		title: '',
		description: '',
		event: props.event,
		activity: props.activity,
		image: undefined,
		showAlert: false,
		alertMessages: [],
		isLoading: false,
	};
	const [state, dispatch] = useReducer(imageReducer, initialState);

	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch({ type: 'field', fieldName: name, fieldValue: value });
	};
	const handleFileChange = (event) => {
		const imageFile = event.target.files[0];
		dispatch({ type: 'field', fieldName: 'image', fieldValue: imageFile });
	};
	const handleFormSubmit = (event) => {
		event.preventDefault();
		dispatch({ type: 'resetAlert' });
		if (!state.title) {
			dispatch({ type: 'alert', alertMessage: `Has d'indicar un títol` });
		}
		if (!state.description) {
			dispatch({
				type: 'alert',
				alertMessage: `Has d'introduir una descripció`,
			});
		}
		if (!state.image) {
			dispatch({ type: 'alert', alertMessage: `Has d'inidcar una imatge` });
		}
		if (!state.showAlert) {
			dispatch({ type: 'loading' });
			ImageService.create(
				state.title,
				state.description,
				state.event,
				state.activity,
				state.image
			)
				.then((response) => {
					props.onClick();
				})
				.catch((error) =>
					dispatch({
						type: 'alert',
						alertMessage: error.response.data.message,
					})
				);
			dispatch({ type: 'notLoading' });
		}
	};
	const errorsMessage = state.alertMessages.map((err, index) => (
		<li key={index}>{err}</li>
	));
	return (
		<Form onSubmit={handleFormSubmit} className="w-100">
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Text id="title-text">Títol</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					id="title"
					name="title"
					type="text"
					value={state.title}
					onChange={handleChange}
					placeholder="Títol"
					aria-label="Títol"
					aria-describedby="title-text"
				/>
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Text id="description-text">Descripció</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					id="description"
					name="description"
					as="textarea"
					value={state.description}
					onChange={handleChange}
					placeholder="Descripció"
					aria-label="Descripció"
					aria-describedby="description-text"
				/>
			</InputGroup>
			<InputGroup className="mb-3">
				<InputGroup.Prepend>
					<InputGroup.Text id="image-text">Imatge</InputGroup.Text>
				</InputGroup.Prepend>
				<FormFile
					id="image"
					name="image"
					type="file"
					label="Indica la imatge"
					onChange={handleChange}
					placeholder="Imatge"
					aria-label="Imatge"
					aria-describedby="image-text"
					data-browse="Examinar"
					onChange={handleFileChange}
					custom
				/>
			</InputGroup>
			<Button
				type="submit"
				className="btn btn-success w-100"
				disabled={state.isLoading}
			>
				{state.isLoading ? 'Publicant ...' : 'Publicar'}
			</Button>
			<Alert
				className="mt-2"
				variant="danger"
				show={state.showAlert}
				onClose={() => dispatch({ type: 'closeAlert' })}
				dismissible
			>
				<Alert.Heading>Ups!</Alert.Heading>
				<ul>{errorsMessage}</ul>
			</Alert>
		</Form>
	);
}

export default ImageForm;
