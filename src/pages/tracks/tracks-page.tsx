import {
	ButtonGroup,
	IconButton,
	Pagination,
	Table,
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
		<ProgressBox isLoading={isPending} boxProps={{maxWidth: '600px', margin: '0 auto'}}>
			<Table.Root variant="outline">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader>Cover</Table.ColumnHeader>

						<Table.ColumnHeader>Title</Table.ColumnHeader>

						<Table.ColumnHeader>Artist</Table.ColumnHeader>

						<Table.ColumnHeader>Album</Table.ColumnHeader>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{availableTracks.map(({
						id,
						title,
						artist,
						album,
						coverImage,
					}) => {
						return (
							<Table.Row key={id}>
								<Table.Cell>
									<Image
										src={coverImage}
										fallbackSrc={DefaultTrackCover}
										alt={`${title} by ${artist} cover`}
										rounded="md"
										height="48px"
										width="48px"
										fit="contain"
									/>
								</Table.Cell>

								<Table.Cell>{title}</Table.Cell>

								<Table.Cell>{artist}</Table.Cell>

								<Table.Cell>{album}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>

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
		</ProgressBox>
	);
};

export default TracksPage;
