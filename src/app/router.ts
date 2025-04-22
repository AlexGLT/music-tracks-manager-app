import {createBrowserRouter, Outlet} from 'react-router-dom';

import Tracks from '@pages/tracks';


export const router = createBrowserRouter([
	{
		path: '/',
		Component: Outlet,
		children: [
			{index: true, Component: Tracks},
		],
	},
]);
