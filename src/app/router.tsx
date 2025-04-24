import {createBrowserRouter, Navigate, Outlet} from 'react-router-dom';

import Tracks from '@pages/tracks';
import {TRACKS_PAGE_ID} from '@shared/routes/tracks';


export const router = createBrowserRouter([
	{
		path: '/',
		Component: Outlet,
		children: [
			{index: true, element: <Navigate to={TRACKS_PAGE_ID} replace={true}/>},
			{path: TRACKS_PAGE_ID, element: <Tracks/>},
		],
	},
]);
