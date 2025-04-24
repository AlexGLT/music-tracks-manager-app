import {z} from 'zod';


export const EditedTrackInfoSchema = z.object({
	title: z.string().nonempty(),
	artist: z.string().nonempty(),
	album: z.string().optional(),
	genres: z.array(z.string()),
	coverImage: z.string().url().optional(),
});

export type EditedTrackInfo = z.infer<typeof EditedTrackInfoSchema>;
