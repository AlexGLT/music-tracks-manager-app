import type {ModifiedTrack} from './model';


export const EMPTY_MODIFIED_TRACK: ModifiedTrack = {
	title: '',
	artist: '',
	// @ts-expect-error WHY: only for initialization
	genres: [],
};
