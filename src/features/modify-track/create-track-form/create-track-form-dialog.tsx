import {memo, useRef} from 'react';

import {ModifyTrackDialog} from '../modify-track-dialog';
import {useModifyTrackForm} from '../use-modify-track-form';
import {EMPTY_MODIFIED_TRACK} from '../constants';

import type {FC, FormEventHandler} from 'react';
import type {ModifiedTrack} from '../model';


type Props = {
	allGenres: Array<string>,
	isOpen: boolean,
	onClose: () => void,
};

export const CreateTrackFormDialog: FC<Props> = memo(function CreateTrackFormDialog({
	allGenres,
	isOpen,
	onClose,
}) {
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const initialElementRef = useRef<HTMLInputElement | null>(null);

	const {
		form,
		canBeCleared,
		canBeSubmitted,
		handleSubmit,
		handleReset,
	} = useModifyTrackForm({
		defaultValues: EMPTY_MODIFIED_TRACK,
		onSubmit: async (value: ModifiedTrack) => {
			console.warn('submit!', value);

			return await Promise.resolve(true);
		},
	});

	const handleFormSubmit: FormEventHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
	};

	const handleClose = (): void => {
		onClose();
		form.reset();
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<ModifyTrackDialog
				dialogRef={dialogRef}
				initialElementRef={initialElementRef}
				canBeSubmitted={canBeSubmitted}
				canBeCleared={canBeCleared}
				isOpen={isOpen}
				onClose={handleClose}
				onSubmit={handleSubmit}
				onReset={handleReset}
			>
				<form.AppField name="title">
					{(field) => {
						return (
							<field.TextField
								ref={initialElementRef}
								isRequired={true}
								label="Title"
								placeholder="Enter track title, e.g. 'Faint'"
							/>
						);
					}}
				</form.AppField>

				<form.AppField name="artist">
					{(field) => {
						return (
							<field.TextField
								isRequired={true}
								label="Artist"
								placeholder="Enter track artist, e.g. 'Linkin Park'"
							/>
						);
					}}
				</form.AppField>

				<form.AppField name="album">
					{(field) => {
						return (
							<field.TextField
								label="Album"
								placeholder="Enter track album, e.g. 'Meteora'"
							/>
						);
					}}
				</form.AppField>

				<form.AppField name="genres">
					{(field) => {
						return (
							<field.TagListField
								portalRef={dialogRef}
								isRequired={true}
								label="Genres"
								allTags={allGenres}
							/>
						);
					}}
				</form.AppField>

				<form.AppField name="coverImage">
					{(field) => {
						return (
							<field.TextField
								label="Cover Image URL"
								placeholder="Enter some URL for cover image"
							/>
						);
					}}
				</form.AppField>
			</ModifyTrackDialog>
		</form>
	);
});
