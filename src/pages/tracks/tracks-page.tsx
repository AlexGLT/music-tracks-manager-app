import {
	Box,
	Button,
	ButtonGroup,
	createListCollection,
	Flex,
	IconButton,
	Pagination,
	Popover,
	Portal,
	Select,
	Table,
	Text,
	Tooltip,
} from '@chakra-ui/react';

import {
	HiChevronLeft,
	HiChevronRight,
	HiOutlineClock,
	HiOutlinePencil,
	HiOutlineTrash,
} from 'react-icons/hi';

import {
	CreateTrackFormDialog,
	EditTrackFormDialog,
	useCreateTrackDialog,
	useEditTrackDialog,
} from '@features/modify-track';

import DefaultTrackCover from '@assets/default-track-cover.png';
import ProgressBox from '@shared/ui/progress-box';
import Image from '@shared/ui/image';
import {isNumber} from '@shared/utils';

import {useAvailableGenres, useAvailableTracks} from './hooks';

import type {ComponentProps, FC} from 'react';


type OnPageChange = NonNullable<ComponentProps<typeof Pagination.Root>['onPageChange']>;
type OnPageSizeChange = NonNullable<ComponentProps<typeof Select.Root>['onValueChange']>;

const availablePageSizes = createListCollection({items: [5, 10, 25, 50].map((pageSize) => String(pageSize))});

const TracksPage: FC = () => {
	const {
		isPending: isGenresPending,
		availableGenres,
	} = useAvailableGenres();

	const {
		isPending: isTracksPending,
		availableTracks,
		activePageNumber,
		activePageSize,
		totalTracks,
		changePageNumber,
		changePageSize,
	} = useAvailableTracks();

	const {
		isCreateTrackDialogOpen,
		openCreateTrackDialog,
		closeCreateTrackDialog,
	} = useCreateTrackDialog();

	const {
		activeEditTrack,
		changeActiveEditTrack,
		clearActiveEditTrack,
	} = useEditTrackDialog();

	if ((isGenresPending && !availableGenres.length) || (isTracksPending && !availableTracks.length)) {
		return <div>Loading...</div>;
	}

	const handlePageChange: OnPageChange = (details): void => {
		changePageNumber(details.page);
		changePageSize(details.pageSize);
	};

	const handlePageSizeChange: OnPageSizeChange = (details): void => {
		const pageSize = details.value.length
			? Number(details.value[0])
			: undefined;

		if (isNumber(pageSize)) {
			changePageSize(pageSize);
		}
	};

	const isPending = isTracksPending || isGenresPending;

	return (
		<Flex
			style={{maxWidth: '600px', margin: '0 auto'}}
			direction="column"
			gap="2"
			position="relative"
		>
			<Button onClick={openCreateTrackDialog}>Create track</Button>

			<ProgressBox isLoading={isPending}>
				<Table.Root
					variant="outline"
					size="md"
					stickyHeader={true}
					interactive={true}
				>
					<Table.ColumnGroup>
						<Table.Column htmlWidth="50%"/>

						<Table.Column htmlWidth="30%"/>

						<Table.Column htmlWidth="20%"/>
					</Table.ColumnGroup>

					<Table.Header>
						<Table.Row>
							<Table.ColumnHeader>
								<Text fontWeight="semibold">
									Title
								</Text>
							</Table.ColumnHeader>

							<Table.ColumnHeader>
								<Text fontWeight="semibold">
									Album
								</Text>
							</Table.ColumnHeader>

							<Table.ColumnHeader>
								<Text fontWeight="semibold">
									Actions
								</Text>
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{availableTracks.map((track) => {
							const {
								id,
								title,
								artist,
								album,
								coverImage,
								createdAt,
								updatedAt,
							} = track;

							const onEditButtonClick = (): void => {
								changeActiveEditTrack(track);
							};

							return (
								<Table.Row key={id}>
									<Table.Cell>
										<Flex justify="space-between">
											<Flex gap="4">
												<Image
													src={coverImage}
													fallbackSrc={DefaultTrackCover}
													alt={`${title} by ${artist} cover`}
													rounded="md"
													height="48px"
													width="48px"
													fit="contain"
												/>

												<Flex direction="column">
													<Text fontWeight="semibold">
														{title}
													</Text>

													<Text fontSize="small">
														{artist}
													</Text>
												</Flex>
											</Flex>

											<Popover.Root>
												<Tooltip.Root positioning={{placement: 'top'}} openDelay={500}>
													<Tooltip.Trigger asChild={true}>
														<Box display="inline-block">
															<Popover.Trigger asChild={true}>
																<IconButton variant="surface" size="2xs">
																	<HiOutlineClock/>
																</IconButton>
															</Popover.Trigger>
														</Box>
													</Tooltip.Trigger>

													<Portal>
														<Tooltip.Positioner>
															<Tooltip.Content>
																<Tooltip.Arrow>
																	<Tooltip.ArrowTip/>
																</Tooltip.Arrow>

																Click to see creating and updating times
															</Tooltip.Content>
														</Tooltip.Positioner>
													</Portal>
												</Tooltip.Root>

												<Portal>
													<Popover.Positioner>
														<Popover.Content width="auto">
															<Popover.Arrow/>

															<Popover.Body>
																<Flex direction="column" gap="2">
																	{createdAt ? (
																		<Text>
																			<Text fontWeight="bold" as="b">
																				Created at
																			</Text>
																			&nbsp;
																			<Text as="span">
																				{new Date(createdAt)
																					.toLocaleDateString()}
																			</Text>
																		</Text>
																	) : null}

																	{updatedAt && updatedAt !== createdAt ? (
																		<Text>
																			<Text fontWeight="bold" as="b">
																				Updated at
																			</Text>
																			&nbsp;
																			<Text as="span">
																				{new Date(updatedAt)
																					.toLocaleDateString()}
																			</Text>
																		</Text>
																	) : null}
																</Flex>
															</Popover.Body>
														</Popover.Content>
													</Popover.Positioner>
												</Portal>
											</Popover.Root>
										</Flex>
									</Table.Cell>

									<Table.Cell>{album}</Table.Cell>

									<Table.Cell justifyItems="end">
										<Flex gap="2">
											<IconButton
												variant="outline"
												colorPalette="yellow"
												onClick={onEditButtonClick}
											>
												<HiOutlinePencil/>
											</IconButton>

											<IconButton
												variant="outline"
												colorPalette="red"
											>
												<HiOutlineTrash/>
											</IconButton>
										</Flex>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table.Root>
			</ProgressBox>

			<Flex
				rounded="2"
				alignSelf="center"
				bg="white"
				shadow="md"
				padding="2"
				alignItems="center"
				justify="space-between"
				width="100%"
				style={{position: 'sticky', bottom: 0}}
			>
				{totalTracks > activePageSize ? (
					<Pagination.Root
						count={totalTracks}
						page={activePageNumber}
						pageSize={activePageSize}
						onPageChange={handlePageChange}
					>
						<ButtonGroup variant="ghost" size="md">
							<Pagination.PrevTrigger asChild={true}>
								<IconButton>
									<HiChevronLeft/>
								</IconButton>
							</Pagination.PrevTrigger>

							<Pagination.Items
								render={(page) => (
									<IconButton variant={{base: 'ghost', _selected: 'outline'}}>
										{page.value}
									</IconButton>
								)}
							/>

							<Pagination.NextTrigger asChild={true}>
								<IconButton>
									<HiChevronRight/>
								</IconButton>
							</Pagination.NextTrigger>
						</ButtonGroup>
					</Pagination.Root>
				) : null}

				<Select.Root
					size="md"
					collection={availablePageSizes}
					marginLeft="auto"
					width="30%"
					value={[String(activePageSize)]}
					onValueChange={handlePageSizeChange}
				>
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Select page size"/>
						</Select.Trigger>

						<Select.IndicatorGroup>
							<Select.Indicator/>
						</Select.IndicatorGroup>
					</Select.Control>

					<Portal>
						<Select.Positioner>
							<Select.Content>
								{availablePageSizes.items.map((pageSize) => (
									<Select.Item key={pageSize} item={pageSize}>
										{pageSize}

										<Select.ItemIndicator/>
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>
			</Flex>

			<CreateTrackFormDialog
				allGenres={availableGenres}
				isOpen={isCreateTrackDialogOpen}
				onClose={closeCreateTrackDialog}
			/>

			<EditTrackFormDialog
				allGenres={availableGenres}
				activeEditTrack={activeEditTrack}
				onClose={clearActiveEditTrack}
			/>
		</Flex>
	);
};

export default TracksPage;
