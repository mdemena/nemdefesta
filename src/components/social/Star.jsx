import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Star(props) {
	const star = props.user ? (
		props.array.includes(props.user._id) ? (
			<div className="d-flex flex-row justify-content-between align-items-center">
				<AiFillStar />
				Assistiràs!
			</div>
		) : (
			<div className="d-flex flex-row justify-content-between align-items-center">
				<AiOutlineStar />
				Assistiràs?
			</div>
		)
	) : (
		<div className="d-flex flex-row justify-content-between align-items-center">
			<AiOutlineStar />
			Assistiràs?
		</div>
	);

	return <>{star}</>;
}

export default Star;
