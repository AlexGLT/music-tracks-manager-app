import {GENRE} from './types';

import type {Genre} from './types';


export const isGenre = (value: unknown): value is Genre => {
	return typeof value === 'string' && value in GENRE;
};
