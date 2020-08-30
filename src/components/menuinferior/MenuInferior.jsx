import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

function MenuInferior(props) {
	const location = useLocation();

	const getNavLinkClass = (path) => {
		let cssName = location.pathname === path ? 'active ' : '';
		cssName +=
			'd-flex flex-column justify-content-center align-items-center mr-4 ml-4';
		return cssName;
	};
	return (
		<Navbar fixed="bottom" bg="success">
			<Nav className="justify-content-around ml-auto mr-auto">
				<Nav.Link href="/" className={getNavLinkClass('/')}>
					<Icon.HouseFill size="25px" />
				</Nav.Link>
				<Nav.Link href="/map" className={getNavLinkClass('/map')}>
					<Icon.GeoAlt size="25px" />
				</Nav.Link>
				<Nav.Link href="/login" className={getNavLinkClass('/login')}>
					<Icon.PersonCircle size="25px" />
				</Nav.Link>
			</Nav>
		</Navbar>
	);
}

export default MenuInferior;
