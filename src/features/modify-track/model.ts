import {z} from 'zod';


export const ModifiedTrackSchema = z.object({
	title: z.string().nonempty(),
	artist: z.string().nonempty(),
	album: z.string().optional(),
	genres: z.array(z.string()).nonempty(),
	coverImage: z.string().url().optional(),
});

export type ModifiedTrack = z.infer<typeof ModifiedTrackSchema>;
