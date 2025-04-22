import type {Values} from '../../types';


export const GENRE = {
	ROCK: 'Rock',
	POP: 'Pop',
	HIP_HOP: 'Hip Hop',
	JAZZ: 'Jazz',
	CLASSICAL: 'Classical',
	ELECTRONICAL: 'Electronic',
	R_AND_B: 'R&B',
	COUNTRY: 'Country',
	FOLK: 'Folk',
	REGGAE: 'Reggae',
	METAL: 'Metal',
	BLUES: 'Blues',
	INDIE: 'Indie',
};

export type Genre = Values<typeof GENRE>;
