import {isObject, isString} from '@shared/utils';

import type {TrackInfo} from './types';


export const validateTrackInfo = (value: unknown, fallback: Array<TrackInfo>): Array<TrackInfo> => {
	if (Array.isArray(value)) {
		const tracks = value.reduce<Array<TrackInfo>>((acc, track) => {
			const album = isObject(track) && 'album' in track && isString(track.album)
				? track.album
				: undefined;

			const artist = isObject(track) && 'artist' in track && isString(track.artist)
				? track.artist
				: undefined;

			const audioFile = isObject(track) && 'audioFile' in track && isString(track.audioFile)
				? track.audioFile
				: undefined;

			const coverImage = isObject(track) && 'coverImage' in track && isString(track.coverImage)
				? track.coverImage
				: undefined;

			const createdAt = isObject(track) && 'createdAt' in track && isString(track.createdAt)
				? track.createdAt
				: undefined;

			const genres = isObject(track) && 'genres' in track && Array.isArray(track.genres) && track.genres.every((genre) => isString(genre))
				? track.genres
				: undefined;

			const id = isObject(track) && 'id' in track && isString(track.id)
				? track.id
				: undefined;

			const slug = isObject(track) && 'slug' in track && isString(track.slug)
				? track.slug
				: undefined;

			const title = isObject(track) && 'title' in track && isString(track.title)
				? track.title
				: undefined;

			const updatedAt = isObject(track) && 'updatedAt' in track && isString(track.updatedAt)
				? track.updatedAt
				: undefined;

			if (album && artist && coverImage && createdAt && genres && id && slug && title && updatedAt) {
				acc.push({
					album,
					artist,
					audioFile,
					coverImage,
					createdAt,
					genres,
					id,
					slug,
					title,
					updatedAt,
				});
			}

			return acc;
		}, []);

		return tracks.length
			? tracks
			: fallback;
	}

	return [];
};
