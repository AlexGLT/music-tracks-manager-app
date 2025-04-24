import {Button, Flex} from '@chakra-ui/react';

import {
	CreateTrackFormDialog,
	EditTrackFormDialog,
	useCreateTrackDialog,
	useEditTrackDialog,
} from '@features/modify-track';

import ProgressBox from '@shared/ui/progress-box';

import {TracksTable} from './table';
import {PageNavigator, PageSizeSelect, usePagination} from './pagination';
import {useAvailableGenres, useAvailableTracks} from './hooks';

import type {FC} from 'react';


const noop = (): void => undefined;

const TracksPage: FC = () => {
	const {
		activePageNumber,
		activePageSize,
		changePageNumber,
		changePageSize,
	} = usePagination();

	const {
		isPending: isGenresPending,
		availableGenres,
	} = useAvailableGenres();

	const {
		isPending: isTracksPending,
		availableTracks,
		totalTracks,
	} = useAvailableTracks({
		activePageNumber,
		activePageSize,
	});

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
				<TracksTable
					activeTracks={availableTracks}
					onTrackEdit={changeActiveEditTrack}
					onTrackDelete={noop}
					variant="outline"
					size="md"
					stickyHeader={true}
					interactive={true}
				/>
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
				<PageNavigator
					totalTracks={totalTracks}
					activePageNumber={activePageNumber}
					activePageSize={activePageSize}
					onPageNumberChange={changePageNumber}
				/>

				<PageSizeSelect
					activePageSize={activePageSize}
					onPageSizeChange={changePageSize}
					size="md"
					marginLeft="auto"
					width="196px"
				/>
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
