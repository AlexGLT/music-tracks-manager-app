import {RouterProvider} from 'react-router-dom';
import {ChakraProvider, defaultSystem} from '@chakra-ui/react';

import {router} from './router';

import './app.css';

import type {FC} from 'react';


const App: FC = () => {
	return (
		<ChakraProvider value={defaultSystem}>
			<RouterProvider router={router}/>
		</ChakraProvider>
	);
};

export default App;
