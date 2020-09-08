import React, { useState } from 'react';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import dayjs from 'dayjs';
require('dayjs/locale/es');

function SearchBox(props) {
	const initialState = {
		searchText: props.searchEvents || '',
		fromDate: props.fromDate || dayjs().format('YYYY-MM-DD'),
		toDate: props.toDate || dayjs().add(1, 'month').format('YYYY-MM-DD'),
	};
	const [search, setSearch] = useState(initialState);

	const handleChange = (event) => {
		setSearch({ ...search, [event.target.name]: event.target.value });
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		props.onChange(search);
	};

	return (
		<Form inline onSubmit={handleSubmit} className="w-100">
			<Form.Row className="align-items-center w-100">
				<Col>
					<InputGroup>
						<Form.Control
							type="text"
							className="w-auto"
							id="searchText"
							name="searchText"
							placeholder="Cercar"
							value={search.searchText}
							onChange={handleChange}
							aria-label="Search"
							aria-describedby="search-text"
						/>
						<InputGroup.Append>
							<Button variant="success" type="submit">
								<FaSearch />
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</Col>
			</Form.Row>
			<Form.Row className="align-items-center w-100 mt-2">
				<Col>
					<InputGroup>
						<InputGroup.Prepend>
							<InputGroup.Text id="fromdate-text">Inici:</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							type="date"
							id="fromDate"
							name="fromDate"
							value={search.fromDate}
							onChange={handleChange}
							aria-label="Inici"
							aria-describedby="fromdate-text"
						/>
					</InputGroup>
				</Col>
				<Col>
					<InputGroup className="inputRow">
						<InputGroup.Prepend>
							<InputGroup.Text id="todate-text">Fi:</InputGroup.Text>
						</InputGroup.Prepend>
						<Form.Control
							type="date"
							id="toDate"
							name="toDate"
							value={search.toDate}
							onChange={handleChange}
							aria-label="Fi"
							aria-describedby="todate-text"
						/>
					</InputGroup>
				</Col>
			</Form.Row>
		</Form>
	);
}

export default SearchBox;
