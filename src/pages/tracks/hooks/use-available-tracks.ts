import {useEffect, useState} from 'react';
import axios from 'axios';
import {z} from 'zod';

import {useAbortSignal} from '@shared/hooks';
import {isObject} from '@shared/utils';

import {PaginationInfoSchema, TrackInfoSchema} from '../types';

import type {TrackInfo} from '../types';


const EMPTY_TRACKS: Array<TrackInfo> = [];

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_TOTAL_TRACKS = 0;
const DEFAULT_TOTAL_PAGES = 1;

type ReturnParams = {
	isPending: boolean,
	availableTracks: Array<TrackInfo>,
	activePageNumber: number,
	activePageSize: number,
	totalTracks: number,
	totalPages: number,
	changePageNumber: (page: number) => void,
	changePageSize: (rowPerPageCount: number) => void,
};

export const useAvailableTracks = (): ReturnParams => {
	const {abort, createAbortSignal} = useAbortSignal();

	const [isPending, setIsPending] = useState(true);
	const [availableTracks, setAvailableTracks] = useState(EMPTY_TRACKS);

	const [activePageNumber, setActivePageNumber] = useState(DEFAULT_PAGE_NUMBER);
	const [activePageSize, setActivePageSize] = useState(DEFAULT_PAGE_SIZE);
	const [totalTracks, setTotalTracks] = useState(DEFAULT_TOTAL_TRACKS);
	const [totalPages, setTotalPages] = useState(DEFAULT_TOTAL_PAGES);

	useEffect(() => {
		let isUnmounted = false;

		setIsPending(true);

		axios.get('http://localhost:8000/api/tracks', {
			signal: createAbortSignal(),
			params: {
				page: activePageNumber,
				limit: activePageSize,
			},
		})
			.then(({data: responseData}) => {
				if (!isUnmounted) {
					const {data, meta} = isObject(responseData) && 'data' in responseData && 'meta' in responseData
						? responseData
						: {};

					const parsedTracks = z.array(z.any()).parse(data)
						.reduce<Array<TrackInfo>>((acc, track) => {
							const {
								success: tracksSuccess,
								data: parsedTrack,
							} = TrackInfoSchema.safeParse(track);

							if (tracksSuccess) {
								acc.push(parsedTrack);
							}

							return acc;
						}, []);


					const parsedPaginationInfo = PaginationInfoSchema.parse(meta);

					setAvailableTracks(parsedTracks);
					setTotalTracks(parsedPaginationInfo.total);
					setTotalPages(parsedPaginationInfo.totalPages);
				}
			})
			.catch((error) => {
				if (error instanceof Error) {
					if (error.name === 'AbortError' || error.name === 'CanceledError') {
						return;
					}

					console.error(error.message);

					if (!isUnmounted) {
						setAvailableTracks(EMPTY_TRACKS);
						setActivePageNumber(DEFAULT_PAGE_NUMBER);
						setTotalTracks(DEFAULT_TOTAL_TRACKS);
						setTotalPages(DEFAULT_TOTAL_PAGES);
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
		activePageNumber,
		activePageSize,
		abort,
		createAbortSignal,
	]);

	return {
		isPending,
		availableTracks,
		activePageNumber,
		activePageSize,
		totalTracks,
		totalPages,
		changePageNumber: setActivePageNumber,
		changePageSize: setActivePageSize,
	};
};
