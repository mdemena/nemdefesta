import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function SearchBox(props) {
	const [search, setSearch] = useState('');
	const handleChange = (event) => {
		setSearch(event.target.value);
		props.onChange(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		props.onChange(search);
	};
	return (
		<Form inline onSubmit={handleSubmit} className="w-100">
			<Form.Row className="align-items-center w-100">
				<Col>
					<Form.Control
						type="text"
						placeholder="Cercar"
						value={search}
						onChange={handleChange}
					/>
				</Col>
				<Col xs="25px">
					<Button variant="success" type="submit">
						<FaSearch size="25px" />
					</Button>
				</Col>
			</Form.Row>
		</Form>
	);
}

export default SearchBox;
