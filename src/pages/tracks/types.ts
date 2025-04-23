import {z} from 'zod';


export const TrackInfoSchema = z.object({
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

export type TrackInfo = z.infer<typeof TrackInfoSchema>;

export const PaginationInfoSchema = z.object({
	total: z.number().int().positive(),
	page: z.number().int().positive(),
	limit: z.number().int().positive(),
	totalPages: z.number().int().positive(),
});

export type PaginationInfo = z.infer<typeof PaginationInfoSchema>;
