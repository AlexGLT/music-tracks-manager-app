import {useLayoutEffect, useMemo, useRef} from 'react';
import {useForm} from '@tanstack/react-form';

import {
	Dialog,
	Button,
	Input,
	Portal,
	CloseButton,
	Flex,
	Field,
	Popover,
	Text,
} from '@chakra-ui/react';

import {isEqual} from 'es-toolkit';

import {EditedTrackInfoSchema} from './types';

import type {
	ComponentProps,
	FC,
	FormEventHandler,
} from 'react';

import type {TrackInfo} from '../types';
import type {EditedTrackInfo} from './types';


const EMPTY_TRACK_INFO: EditedTrackInfo = {
	title: '',
	artist: '',
	genres: [],
};

type OnOpenChange = NonNullable<ComponentProps<typeof Dialog.Root>['onOpenChange']>;

type Props = {
	activeEditTrack: TrackInfo | undefined,
	onClose: () => void,
};

const EditTrackDialog: FC<Props> = ({
	activeEditTrack,
	onClose: onCloseExternal,
}) => {
	const initialElementRef = useRef<HTMLInputElement>(null);

	const form = useForm({
		defaultValues: EMPTY_TRACK_INFO,
		validators: {
			onChange: EditedTrackInfoSchema,
		},
		onSubmit: ({value}) => {
			console.warn('submit!', value);
		},
	});

	const activeTrackInfo = useMemo(() => {
		if (activeEditTrack) {
			const {
				title,
				artist,
				album,
				genres,
				coverImage,
			} = activeEditTrack;

			return {
				title,
				artist,
				album,
				genres,
				coverImage,
			};
		}

		return undefined;
	}, [activeEditTrack]);

	useLayoutEffect(() => {
		if (activeTrackInfo) {
			form.reset(activeTrackInfo, {keepDefaultValues: true});
		}
	}, [
		activeTrackInfo,
		form,
	]);

	const onOpenChange: OnOpenChange = ({open}) => {
		if (!open) {
			onCloseExternal();
		}
	};

	const onSubmit: FormEventHandler = (event) => {
		event.preventDefault();
		event.stopPropagation();
		form.handleSubmit();
	};

	return (
		<form onSubmit={onSubmit}>
			<Dialog.Root
				size="lg"
				placement="center"
				open={!!activeEditTrack}
				onOpenChange={onOpenChange}
				initialFocusEl={() => initialElementRef.current}
			>
				<Portal>
					<Dialog.Backdrop/>

					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Edit Track</Dialog.Title>
							</Dialog.Header>

							<Dialog.Body>
								<Flex direction="column" gap={4}>
									<form.Field name="title">
										{({state, handleBlur, handleChange}) => {
											const {meta: {errors}, value} = state;
											const errorMessage = errors[0]?.message;

											return (
												<Field.Root required={true} invalid={!!errorMessage}>
													<Field.Label>Title <Field.RequiredIndicator/></Field.Label>

													<Input
														ref={initialElementRef}
														value={value}
														placeholder="Enter track title, e.g. 'Faint'"
														onChange={(event) => handleChange(event.target.value)}
														onBlur={handleBlur}
													/>

													<Field.ErrorText>{errorMessage}</Field.ErrorText>
												</Field.Root>
											);
										}}
									</form.Field>

									<form.Field name="artist">
										{({state, handleBlur, handleChange}) => {
											const {meta: {errors}, value} = state;
											const errorMessage = errors[0]?.message;

											return (
												<Field.Root required={true} invalid={!!errorMessage}>
													<Field.Label>Artist <Field.RequiredIndicator/></Field.Label>

													<Input
														value={value}
														placeholder="Enter track artist, e.g. 'Linkin Park'"
														onChange={(event) => handleChange(event.target.value)}
														onBlur={handleBlur}
													/>

													<Field.ErrorText>{errorMessage}</Field.ErrorText>
												</Field.Root>
											);
										}}
									</form.Field>

									<form.Field name="album">
										{({state, handleBlur, handleChange}) => {
											return (
												<Field.Root required={true}>
													<Field.Label>Album</Field.Label>

													<Input
														value={state.value}
														placeholder="Enter track album, e.g. 'Meteora'"
														onChange={(event) => handleChange(event.target.value)}
														onBlur={handleBlur}
													/>
												</Field.Root>
											);
										}}
									</form.Field>

									<form.Field name="coverImage">
										{({state, handleBlur, handleChange}) => {
											const {meta: {errors}, value} = state;
											const errorMessage = errors[0]?.message;

											return (
												<Field.Root required={true} invalid={!!errorMessage}>
													<Field.Label>Cover Image URL</Field.Label>

													<Input
														value={value}
														placeholder="Enter some url for cover image"
														onChange={(event) => handleChange(event.target.value)}
														onBlur={handleBlur}
													/>

													<Field.ErrorText>{errorMessage}</Field.ErrorText>
												</Field.Root>
											);
										}}
									</form.Field>
								</Flex>
							</Dialog.Body>

							<form.Subscribe selector={(state) => state.values}>
								{(currentValues) => {
									const areValuesDefault = isEqual(
										currentValues,
										form.options.defaultValues,
									);

									return (
										<Dialog.Footer justifyContent="space-between">
											<Flex gap="4">
												<Dialog.ActionTrigger asChild={true}>
													<Button
														type="submit"
														colorPalette="blue"
														disabled={areValuesDefault}
													>
														Save
													</Button>
												</Dialog.ActionTrigger>

												<Button
													type="reset"
													variant="ghost"
													disabled={areValuesDefault}
													onClick={() => form.reset()}
												>
													Clear Changes
												</Button>
											</Flex>

											{areValuesDefault ? (
												<Dialog.ActionTrigger asChild={true}>
													<Button variant="outline">
														Cancel
													</Button>
												</Dialog.ActionTrigger>
											) : (
												<Popover.Root>
													<Popover.Trigger asChild={true}>
														<Button variant="outline">
															Cancel
														</Button>
													</Popover.Trigger>

													<Portal>
														<Popover.Positioner>
															<Popover.Content>
																<Popover.Arrow/>

																<Popover.Body padding="4">
																	<Flex direction="column" gap="4">
																		<Text fontWeight="semibold">
																			Unsaved changes will be discarded. Continue?
																		</Text>

																		<Flex justifyContent="space-between">
																			<Popover.CloseTrigger asChild={true}>
																				<Button variant="outline" width="25%">
																					No
																				</Button>
																			</Popover.CloseTrigger>

																			<Dialog.ActionTrigger asChild={true}>
																				<Button colorPalette="red" width="25%">
																					Yes
																				</Button>
																			</Dialog.ActionTrigger>
																		</Flex>

																	</Flex>
																</Popover.Body>
															</Popover.Content>
														</Popover.Positioner>
													</Portal>
												</Popover.Root>
											)}
										</Dialog.Footer>
									);
								}}
							</form.Subscribe>

							<Dialog.CloseTrigger asChild={true}>
								<CloseButton size="sm"/>
							</Dialog.CloseTrigger>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</form>
	);
};

export default EditTrackDialog;
