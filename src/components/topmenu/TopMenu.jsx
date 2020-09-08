import React from 'react';
import { Navbar } from 'react-bootstrap';
import { GiDandelionFlower } from 'react-icons/gi';

function TopMenu() {
	return (
		<Navbar fixed="top" bg="success" expand="md">
			<Navbar.Brand to="/" className="d-flex flex-row align-items-center">
				<GiDandelionFlower />
				<span className="ml-2">Nem De Festa !!</span>
			</Navbar.Brand>
			{/* <Navbar.Toggle aria-controls="menu-nemdefesta" />
			<Navbar.Collapse id="menu-nemdefesta">
				<Nav className="mr-auto">
					<NavLink to="/map">Propers</NavLink>
					<NavLink to="/login">Entrar</NavLink>
				</Nav>
			</Navbar.Collapse> */}
		</Navbar>
	);
}

export default TopMenu;
