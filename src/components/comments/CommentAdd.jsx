import React, { useReducer } from 'react';
import {
	Container,
	Button,
	Form,
	FormControl,
	InputGroup,
	Spinner,
	Modal,
	Alert,
} from 'react-bootstrap';
import CommentService from '../../services/comment/CommentService';

const commentReducer = (state, action) => {
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

function CommentAdd(props) {
	const initialState = {
		title: '',
		description: '',
		user: props.user._id,
	};
	const [state, dispatch] = useReducer(profileReducer, initialState);
	const handleChange = (event) => {
		const { name, value } = event.target;
		dispatch({ type: 'field', fieldName: name, fieldValue: value });
	};
	const handleFormSubmit = async (event) => {
		event.preventDefault();
		dispatch({ type: 'resetAlert' });
		if (!state.title) {
			dispatch({ type: 'alert', alertMessage: `Has d'indicar un títol` });
		}
		if (!state.description) {
			dispatch({ type: 'alert', alertMessage: `Has d'introduir un comentari` });
		if (!state.showAlert) {
			dispatch({ type: 'loading' });
			CommentService.create(state.title, state.description, props.event, props.activity )
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
					<InputGroup.Text id="description-text">Comentari</InputGroup.Text>
				</InputGroup.Prepend>
				<FormControl
					id="description"
					name="description"
					type="text"
					value={state.description}
					onChange={handleChange}
					placeholder="Comentari"
					aria-label="Comentari"
					aria-describedby="description-text"
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

export default CommentAdd;
