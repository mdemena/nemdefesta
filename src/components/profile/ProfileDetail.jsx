import React, { useState, useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	Spinner,
	Accordion,
	Card,
	ListGroup,
} from 'react-bootstrap';
import Avatar from './Avatar';
import UserService from '../../services/user/UserService';
import CommentCard from '../comments/CommentCard';
import ActivityCard from '../activities/ActivityCard';
import ImageCard from '../images/ImageCard';
import { BiCommentDetail } from 'react-icons/bi';
import { BsImages } from 'react-icons/bs';
import { MdLocalActivity } from 'react-icons/md';

function ProfileDetail(props) {
	const id = props.id || props.match.params.id;
	const [user, setUser] = useState({});
	const [activities, setActivities] = useState([]);
	const [comments, setComments] = useState([]);
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getProfile();
	}, []);

	const getProfile = async () => {
		setLoading(true);
		setUser(await UserService.get(id));
		setComments(await UserService.comments(id));
		setActivities(await UserService.activities(id));
		setImages(await UserService.images(id));
		setLoading(false);
	};

	const handleClick = () => {
		getProfile();
	};

	const activityList = activities.map((activity) => (
		<ListGroup.Item key={activity._id} className="pl-0 pr-0">
			<ActivityCard
				key={activity._id}
				user={props.user}
				activity={activity}
				onClick={handleClick}
			></ActivityCard>
		</ListGroup.Item>
	));

	const commentList = comments.map((comment) => (
		<ListGroup.Item key={comment._id} className="pl-0 pr-0">
			<CommentCard
				key={comment._id}
				user={props.user}
				comment={comment}
				onClick={handleClick}
			></CommentCard>
		</ListGroup.Item>
	));
	const imageList = images.map((image) => (
		<ListGroup.Item key={image._id} className="pl-0 pr-0">
			<ImageCard
				key={image._id}
				user={props.user}
				image={image}
				onClick={handleClick}
			></ImageCard>
		</ListGroup.Item>
	));
	if (loading) {
		return (
			<Container
				fluid
				className="fill-window d-flex flex-column justify-content-center align-items-center"
			>
				<Spinner animation="border" variant="success" size="lg" role="status">
					<span className="sr-only">Carregant...</span>
				</Spinner>
			</Container>
		);
	}
	return (
		<Container fluid className="d-flex flex-column align-items-center">
			<Avatar image={user.image} readOnly />
			<h2>{user.username}</h2>
			<Container className="d-flex flex-column">
				<Row>
					<Col>Nom:</Col>
					<Col className="text-left">{user.name}</Col>
				</Row>
				<Row>
					<Col>Email:</Col>
					<Col>{user.email}</Col>
				</Row>
				<Row>
					<hr />
				</Row>
				<Row>
					<Accordion className="mt-2 w-100">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="d-flex flex-row justify-content-between align-items-center">
									Ha realitzat {comments.length} comentaris
									<BiCommentDetail size="20px" />
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									<ListGroup variant="flush">{commentList}</ListGroup>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="1">
								<div className="d-flex flex-row justify-content-between align-items-center">
									Ha publicat {images.length} imatges
									<BsImages size="20px" />
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="1">
								<Card.Body>
									<ListGroup variant="flush">{imageList}</ListGroup>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="2">
								<div className="d-flex flex-row justify-content-between align-items-center">
									Assitirà a {activities.length} activitats
									<MdLocalActivity size="20px" />
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="2">
								<Card.Body>
									<ListGroup variant="flush">{activityList}</ListGroup>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</Row>
			</Container>
		</Container>
	);
}

export default ProfileDetail;
