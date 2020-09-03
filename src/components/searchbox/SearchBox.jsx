import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

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
		<Form
			inline
			className="d-flex flex-row align-items-center"
			onSubmit={handleSubmit}
		>
			<Form.Row>
				<Col xs="auto">
					<Form.Control
						size="25px"
						type="text"
						placeholder="Cercar"
						value={search}
						onChange={handleChange}
					/>
				</Col>
				<Col>
					<Button variant="success" type="submit">
						<Icon.Search size="25px" />
					</Button>
				</Col>
			</Form.Row>
		</Form>
		// <div className="field">
		// 	<div className="control">
		// 		<input
		// 			className="input"
		// 			type="text"
		// 			placeholder="Search"
		// 			name="search"
		// 			onChange={handleChange}
		// 		/>
		// 	</div>
		// </div>
	);
}

export default SearchBox;
