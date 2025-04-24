import {useLayoutEffect, useRef} from 'react';
import {useForm} from '@tanstack/react-form';
import {HiOutlinePlusCircle} from 'react-icons/hi';

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
	Tag,
	Wrap,
	IconButton,
	Menu,
} from '@chakra-ui/react';

import {difference, isEqual, without} from 'es-toolkit';

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
	// @ts-expect-error WHY: only for initialization
	genres: [],
};

type OnOpenChange = NonNullable<ComponentProps<typeof Dialog.Root>['onOpenChange']>;

type Props = {
	availableGenres: Array<string>,
	activeEditTrack: TrackInfo | undefined,
	onClose: () => void,
};

const EditTrackDialog: FC<Props> = ({
	availableGenres,
	activeEditTrack,
	onClose: onCloseExternal,
}) => {
	const dialogContentRef = useRef<HTMLDivElement | null>(null);
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

	useLayoutEffect(() => {
		if (activeEditTrack) {
			form.reset({
				title: activeEditTrack.title,
				artist: activeEditTrack.artist,
				album: activeEditTrack.album,
				genres: activeEditTrack.genres,
				coverImage: activeEditTrack.coverImage,
			}, {keepDefaultValues: false});
		}
	}, [activeEditTrack, form]);

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
						<Dialog.Content ref={dialogContentRef}>
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

									<form.Field name="genres">
										{({state, handleBlur, handleChange}) => {
											const {meta: {errors}, value} = state;
											const errorMessage = errors[0]?.message;
											const unselectedEntities = difference(availableGenres, value);

											return (
												<Field.Root required={true}>
													<Field.Label>Genres</Field.Label>

													<Wrap>
														{value.map((genre) => {
															const onCloseIconClick = (): void => {
																// @ts-expect-error WHY: only for initialization
																handleChange(without(value, genre));
															};

															return (
																<Tag.Root key={genre} variant="surface" size="lg">
																	<Tag.Label>
																		{genre}
																	</Tag.Label>

																	<Tag.EndElement>
																		<Tag.CloseTrigger
																			cursor="pointer"
																			onClick={onCloseIconClick}
																		/>
																	</Tag.EndElement>
																</Tag.Root>
															);
														})}

														{unselectedEntities.length ? (
															<Tag.Root padding={0} size="lg">
																<Menu.Root>
																	<Tag.Label>
																		<Menu.Trigger asChild={true}>
																			<IconButton
																				variant="ghost"
																				rounded="full"
																				size="xs"
																			>
																				<HiOutlinePlusCircle/>
																			</IconButton>

																		</Menu.Trigger>
																	</Tag.Label>

																	<Portal container={dialogContentRef}>
																		<Menu.Positioner>
																			<Menu.Content>
																				{unselectedEntities.map((genre) => {
																					const onItemClick = (): void => {
																						handleChange(
																							// @ts-expect-error WHY: only for initialization
																							value.concat(genre),
																						);
																					};

																					return (
																						<Menu.Item
																							key={genre}
																							value={genre}
																							onClick={onItemClick}
																						>
																							{genre}
																						</Menu.Item>
																					);
																				})}
																			</Menu.Content>
																		</Menu.Positioner>
																	</Portal>
																</Menu.Root>
															</Tag.Root>
														) : null}
													</Wrap>

													<Field.ErrorText>{errorMessage}</Field.ErrorText>
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

							<form.Subscribe selector={(state) => [state.values, state.canSubmit] as const}>
								{([currentValues, canSubmit]) => {
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
														disabled={areValuesDefault || !canSubmit}
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
