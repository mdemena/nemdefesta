import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import SearchBox from './searchbox/SearchBox';

function Home() {
	const [events, setEvents] = useState();
	const [search, setSearch] = useState('');

	const handleSearch = (text) => {
		setSearch(text.toLocaleLowerCase());
	};
	return (
		<Container>
			<Row>
				<SearchBox onChange={handleSearch} />
			</Row>
			<Row></Row>
		</Container>
	);
}

export default Home;
