import {useEffect, useState} from 'react';
import axios from 'axios';
import {z} from 'zod';

import {useAbortSignal} from '@shared/hooks';


const EMPTY_GENRES: Array<string> = [];

type ReturnParams = {
	isPending: boolean,
	availableGenres: Array<string>,
};

export const useAvailableGenres = (): ReturnParams => {
	const {abort, createAbortSignal} = useAbortSignal();

	const [isPending, setIsPending] = useState(true);
	const [availableGenres, setAvailableGenres] = useState(EMPTY_GENRES);

	useEffect(() => {
		let isUnmounted = false;

		setIsPending(true);

		axios.get('http://localhost:8000/api/genres', {signal: createAbortSignal()})
			.then(({data: responseData}) => {
				if (!isUnmounted) {
					setAvailableGenres(z.array(z.string()).parse(responseData));
				}
			})
			.catch((error) => {
				if (error instanceof Error) {
					if (error.name === 'AbortError' || error.name === 'CanceledError') {
						return;
					}

					console.error(error.message);

					if (!isUnmounted) {
						setAvailableGenres(EMPTY_GENRES);
					}
				}
			})
			.finally(() => {
				if (!isUnmounted) {
					setIsPending(false);
				}
			});

		return () => {
			abort();
			isUnmounted = true;
		};
	}, [
		abort,
		createAbortSignal,
	]);

	return {
		isPending,
		availableGenres,
	};
};
