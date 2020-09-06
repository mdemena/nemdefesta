import React from 'react';

function UseStateWithSessionStorage(localStorageKey) {
	const [value, setValue] = React.useState(
		sessionStorage.getItem(localStorageKey) || null
	);

	React.useEffect(() => {
		sessionStorage.setItem(localStorageKey, value);
	}, [value]);

	return [value, setValue];
}
export default UseStateWithSessionStorage;
