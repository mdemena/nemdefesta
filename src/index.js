import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRoute from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<BrowserRoute>
		<App />
	</BrowserRoute>,
	document.getElementById('root')
);

serviceWorker.unregister();
