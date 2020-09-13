import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { BsHouseFill, BsGeoAlt, BsPersonSquare } from 'react-icons/bs';

function BottomMenu(props) {
	const location = useLocation();

	const getNavLinkClass = (path) => {
		let cssName = location.pathname === path ? 'active ' : '';
		cssName +=
			'd-flex flex-column justify-content-center align-items-center mr-4 ml-4 text-white';
		return cssName;
	};
	const userLink = props.user ? (
		<Image
			src={props.user.image}
			alt={props.user.image}
			className="avatarMenu"
			fluid
			roundedCircle
		/>
	) : (
		<BsPersonSquare size="20px" />
	);
	return (
		<Navbar fixed="bottom" bg="success">
			<Nav className="justify-content-around ml-auto mr-auto">
				<NavLink to="/" className={getNavLinkClass('/')}>
					<BsHouseFill size="20px" />
					Inici
				</NavLink>
				<NavLink to="/map" className={getNavLinkClass('/map')}>
					<BsGeoAlt size="20px" />
					Mapa
				</NavLink>
				<NavLink to="/profile" className={getNavLinkClass('/login')}>
					{userLink}Perfil
				</NavLink>
			</Nav>
		</Navbar>
	);
}

export default BottomMenu;
