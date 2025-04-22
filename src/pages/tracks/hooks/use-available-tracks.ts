import {useLayoutEffect, useState} from 'react';

import {useAbortSignal} from '@shared/hooks';
import {isObject} from '@shared/utils';


import {validateTrackInfo} from '../validate-track-info';

import type {TrackInfo} from '../types';


type ReturnParams = {
	isPending: boolean,
	availableTracks: Array<TrackInfo>,
};

const EMPTY_TRACKS: Array<TrackInfo> = [];

export const useAvailableTracks = (): ReturnParams => {
	const [isPending, setIsPending] = useState(false);
	const [availableTracks, setAvailableTracks] = useState(EMPTY_TRACKS);

	const {abort, createAbortSignal} = useAbortSignal();

	useLayoutEffect(() => {
		setIsPending(true);

		fetch('http://localhost:8000/api/tracks', {signal: createAbortSignal()})
			.then((result) => {
				return result.json();
			})
			.then((result) => {
				const parsedTracks = isObject(result) && 'data' in result
					? result.data
					: undefined;

				setAvailableTracks(validateTrackInfo(parsedTracks, EMPTY_TRACKS));
				setIsPending(false);
			})
			.catch((error) => {
				if (isObject(error) && 'name' in error && error.name === 'AbortError') {
					return;
				}

				setIsPending(false);
			});

		return () => {
			abort();
		};
	}, [
		createAbortSignal,
		abort,
	]);

	return {
		isPending,
		availableTracks,
	};
};
