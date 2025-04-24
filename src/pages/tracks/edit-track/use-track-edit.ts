import {useState} from 'react';

import {useStableCallback} from '@shared/hooks';

import type {TrackInfo} from '../types';


type ReturnParams = {
	activeEditTrack: TrackInfo | undefined,
	changeActiveEditTrack: (track: TrackInfo) => void,
	clearActiveEditTrack: () => void,
};

export const useTrackEditing = (): ReturnParams => {
	const [activeEditTrack, setActiveEditTrack] = useState<TrackInfo | undefined>(undefined);

	const changeActiveEditTrack = useStableCallback((track: TrackInfo): void => {
		setActiveEditTrack(track);
	});

	const clearActiveEditTrack = useStableCallback((): void => {
		setActiveEditTrack(undefined);
	});

	return {
		activeEditTrack,
		changeActiveEditTrack,
		clearActiveEditTrack,
	};
};

