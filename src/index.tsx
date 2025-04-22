import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from '@app/app';


const rootEl = document.getElementById('root');

if (rootEl) {
	const root = createRoot(rootEl);

	root.render(
		<StrictMode>
			<App/>
		</StrictMode>,
	);
}
