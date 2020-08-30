import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

function MenuSuperior() {
	return (
		<Navbar fixed="top" bg="success" expand="md">
			<Navbar.Brand href="/" className="d-flex flex-row align-items-center">
				<Icon.Flower3 />
				<span className="ml-2">Nem De Festa !!</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="menu-nemdefesta" />
			<Navbar.Collapse id="menu-nemdefesta">
				<Nav className="mr-auto">
					<Nav.Link href="/map">Propers</Nav.Link>
					<Nav.Link href="/login">Entrar</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}

export default MenuSuperior;
