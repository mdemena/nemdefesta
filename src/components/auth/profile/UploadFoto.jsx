import React, { useState } from 'react';
import UserService from '../../../services/user/UserService';

function UploadFoto(props) {
	const service = new UserService();
	const [showUpload, setShowUpload] = useState(false);
	const [file, setFile] = useState(null);
	const handleUpload = () => {
		setShowUpload(true);
	};
	const handleChange = (event) => {
		setFile(event.target.files[0]);

		service.upload(file).then((response) => {
			props.onUpload(response);
			setShowUpload(false);
		});
	};
	if (!showUpload) {
		return (
			<div>
				<button className="link-reverse" onClick={handleUpload}>
					Editar Imatge
				</button>
			</div>
		);
	} else {
		return (
			<div>
				<div className="form-field">
					<label htmlFor="photo">Imatge:</label>
					<input
						type="file"
						name="file"
						id="file"
						placeholder="Photo file"
						onChange={handleChange}
					/>
				</div>
			</div>
		);
	}
}

export default UploadFoto;
