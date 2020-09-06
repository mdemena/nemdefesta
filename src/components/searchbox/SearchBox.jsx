import React, { useState } from 'react';
import { Form, Button, Col, Accordion } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { DateUtils, DayPickerInput } from 'react-day-picker';
import MomentLocaleUtils, {
	formatDate,
	parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/es';

function SearchBox(props) {
	const initialState = {
		searchText: props.searchText || '',
		fromDate: props.fromDate || new Date(),
		toDate: props.toDate || DateUtils.addMonths(new Date(), 1),
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
					<Form.Control
						type="text"
						id="searchText"
						name="searchText"
						placeholder="Cercar"
						value={search.searchText}
						onChange={handleChange}
					/>
				</Col>
				<Col xs="25px">
					<Button variant="success" type="submit">
						<FaSearch size="25px" />
					</Button>
				</Col>
			</Form.Row>
			{/* <Form.Row className="align-items-center w-100">
				<Col>
					<Form.Label>Data Inici:</Form.Label>
					<DayPickerInput
						id="fromDate"
						name="fromDate"
						formatDate={formatDate}
						parseDate={parseDate}
						value={search.fromDate}
						onChange={handleChange}
						dayPickerProps={{
							locale: 'es',
							localeUtils: MomentLocaleUtils,
						}}
					></DayPickerInput>
				</Col>
				<Col>
					<Form.Label>Data Fi:</Form.Label>
					<DayPickerInput
						id="toDate"
						name="toDate"
						formatDate={formatDate}
						parseDate={parseDate}
						value={search.toDate}
						onChange={handleChange}
						dayPickerProps={{
							locale: 'es',
							localeUtils: MomentLocaleUtils,
						}}
					></DayPickerInput>
				</Col>
			</Form.Row> */}
		</Form>
	);
}

export default SearchBox;
