import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import UserService from '../../services/user/UserService';

function Likes(props) {
	const handleClick = () => {};
	return (
		<div className="d-flex flex-row justify-content-between align-items-center">
			<AiFillLike />
			{props.quantity}
		</div>
	);
}

export default Likes;
