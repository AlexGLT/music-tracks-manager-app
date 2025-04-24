import {z} from 'zod';


export const TrackSchema = z.object({
	id: z.string(),
	title: z.string(),
	artist: z.string(),
	genres: z.array(z.string()).nonempty(),
	album: z.string().optional(),
	slug: z.string().optional(),
	coverImage: z.string().url().optional(),
	audioFile: z.string().optional().optional(),
	createdAt: z.string().datetime().optional(),
	updatedAt: z.string().datetime().optional(),
});

export type Track = z.infer<typeof TrackSchema>;
