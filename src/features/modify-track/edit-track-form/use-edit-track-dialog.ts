import {useState} from 'react';

import {useStableCallback} from '@shared/hooks';

import type {Track} from '@entities/track';


type ReturnParams = {
	activeEditTrack: Track | undefined,
	changeActiveEditTrack: (track: Track) => void,
	clearActiveEditTrack: () => void,
};

export const useEditTrackDialog = (): ReturnParams => {
	const [activeEditTrack, setActiveEditTrack] = useState<Track | undefined>(undefined);

	const changeActiveEditTrack = useStableCallback((track: Track): void => {
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

