import {
	ButtonGroup,
	createListCollection,
	Flex,
	IconButton,
	Pagination,
	Portal,
	Select,
	Table,
	Text,
} from '@chakra-ui/react';

import {HiChevronLeft, HiChevronRight} from 'react-icons/hi';

import DefaultTrackCover from '@assets/default-track-cover.png';
import ProgressBox from '@shared/ui/progress-box';
import Image from '@shared/ui/image-with-fallback';
import {isNumber} from '@shared/utils';

import {useAvailableTracks} from './hooks';

import type {ComponentProps, FC} from 'react';


type OnPageChange = NonNullable<ComponentProps<typeof Pagination.Root>['onPageChange']>;
type OnPageSizeChange = NonNullable<ComponentProps<typeof Select.Root>['onValueChange']>;

const availablePageSizes = createListCollection({items: [5, 10, 25, 50].map((pageSize) => String(pageSize))});

const TracksPage: FC = () => {
	const {
		isPending,
		availableTracks,
		activePageNumber,
		activePageSize,
		totalTracks,
		changePageNumber,
		changePageSize,
	} = useAvailableTracks();

	if (isPending && !availableTracks.length) {
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

	return (
		<Flex
			style={{maxWidth: '800px', margin: '0 auto'}}
			direction="column"
			gap="2"
			position="relative"
		>
			<ProgressBox isLoading={isPending}>
				<Table.Root
					variant="outline"
					size="md"
					striped={true}
					stickyHeader={true}
					interactive={true}
				>
					<Table.ColumnGroup>
						<Table.Column htmlWidth="40%"/>

						<Table.Column htmlWidth="30%"/>

						<Table.Column htmlWidth="15%"/>

						<Table.Column htmlWidth="15%"/>
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
									Created at
								</Text>
							</Table.ColumnHeader>

							<Table.ColumnHeader>
								<Text fontWeight="semibold">
									Updated at
								</Text>
							</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{availableTracks.map(({
							id,
							title,
							artist,
							album,
							coverImage,
							createdAt,
							updatedAt,
						}) => {
							return (
								<Table.Row key={id}>
									<Table.Cell>
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
									</Table.Cell>

									<Table.Cell>{album}</Table.Cell>

									<Table.Cell>
										{createdAt ? new Date(createdAt).toLocaleDateString() : '-'}
									</Table.Cell>

									<Table.Cell>
										{updatedAt ? new Date(updatedAt).toLocaleDateString() : '-'}
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
		</Flex>
	);
};

export default TracksPage;
