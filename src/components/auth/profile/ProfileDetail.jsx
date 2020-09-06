import React, { useState } from 'react';
import {
	Container,
	Row,
	Col,
	Spinner,
	Modal,
	Tabs,
	Tab,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import UserService from '../../../services/user/UserService';

function ProfileDetail() {
	const { id } = useParams();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	UserService.get(id).then((response) => {
		setLoading(false);
		setUser(response);
	});
	if (loading) {
		return (
			<Modal
				show={loading}
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header>
					<Modal.Title>Cercant la Informació</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Container fluid className="d-flex flex-column align-items-center">
						<Spinner
							animation="border"
							variant="success"
							size="lg"
							role="status"
						>
							<span className="sr-only">Grabant...</span>
						</Spinner>
					</Container>
				</Modal.Body>
			</Modal>
		);
	}
	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<h4>Perfil de {user.username}</h4>
			<hr />
			<Avatar image={user.image} readOnly />
			<hr />
			<Container className="d-flex flex-column text-left">
				<Row>
					<Col>Nom:</Col>
					<Col>{user.name}</Col>
				</Row>
				<Row>
					<Col>Email:</Col>
					<Col>{user.email}</Col>
				</Row>
				<Row>
					<Tabs
						defaultActiveKey="assistira"
						transition={false}
						id="profile-tabs"
					>
						<Tab eventKey="assistira" title="Asistirà">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Repellendus, molestias asperiores quas possimus ullam deserunt
							minima commodi eius ad aliquam ut necessitatibus consequatur?
							Dicta, numquam dolore! Magnam dolor sed odit?
						</Tab>
						<Tab eventKey="comentaris" title="Comentaris">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
							ipsam veritatis exercitationem expedita obcaecati aliquid beatae
							quasi ab suscipit facere ipsum fugit ex esse, nesciunt voluptates
							doloremque assumenda corporis. Quas!
						</Tab>
					</Tabs>
				</Row>
			</Container>
		</Container>
	);
}

export default ProfileDetail;
