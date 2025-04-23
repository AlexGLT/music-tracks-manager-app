import {
	ButtonGroup,
	Flex,
	IconButton,
	Pagination,
	Table,
	Text,
} from '@chakra-ui/react';

import {HiChevronLeft, HiChevronRight} from 'react-icons/hi';

import DefaultTrackCover from '@assets/default-track-cover.png';
import ProgressBox from '@shared/ui/progress-box';
import Image from '@shared/ui/image-with-fallback';

import {useAvailableTracks} from './hooks';

import type {ComponentProps, FC} from 'react';


type OnPageChange = NonNullable<ComponentProps<typeof Pagination.Root>['onPageChange']>;
type OnPageSizeChange = NonNullable<ComponentProps<typeof Pagination.Root>['onPageSizeChange']>;

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
		changePageSize(details.pageSize);
	};

	return (
		<Flex style={{maxWidth: '800px', margin: '0 auto'}} direction="column" gap="2">
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

			<Pagination.Root
				count={totalTracks}
				page={activePageNumber}
				pageSize={activePageSize}
				onPageChange={handlePageChange}
				onPageSizeChange={handlePageSizeChange}
			>
				<ButtonGroup variant="ghost" size="sm">
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
		</Flex>
	);
};

export default TracksPage;
