import React from 'react';
import { Popover } from 'react-bootstrap';
import { AiFillAlert } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function PopOverNoLogged() {
	return (
		// <Popover id="popover-contained">
		<>
			<Popover.Title as="h3" className="bg-warning">
				<AiFillAlert className="rounded mr-2" />
				<strong className="mr-auto">¡¡¡ No estàs autenticat !!!</strong>
			</Popover.Title>
			<Popover.Content>
				Pots <Link to="/login">accedir</Link> o{' '}
				<Link to="/signup">registrar-te</Link>
			</Popover.Content>
		</>
		// </Popover>
	);
}

export default PopOverNoLogged;
