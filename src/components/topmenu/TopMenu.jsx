import React from 'react';
import { Navbar } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { GiDandelionFlower } from 'react-icons/gi';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

function TopMenu() {
	const location = useLocation();
	const history = useHistory();

	const handleBackButton = () => {
		history.goBack();
	};
	const handleForwardButton = () => {
		history.goForward();
	};
	const backButton =
		location.pathname === '/' ? (
			<></>
		) : (
			<IoIosArrowBack
				size="25px"
				className="bg-white text-success rounded mr-2"
				onClick={handleBackButton}
			/>
		);
	const forwardButton =
		location.pathname === '/' ? (
			<></>
		) : (
			<IoIosArrowForward
				size="25px"
				className="bg-white text-success rounded mr-2"
				onClick={handleForwardButton}
			/>
		);
	return (
		<Navbar fixed="top" bg="success" className="d-flex flex-row">
			<Navbar.Text className="text-white">{backButton}</Navbar.Text>
			<Navbar.Brand to="/" className="d-flex flex-row align-items-center">
				<GiDandelionFlower className="text-white" />
				<span className="ml-2 text-white">Nem De Festa !!</span>
			</Navbar.Brand>
		</Navbar>
	);
}

export default TopMenu;
