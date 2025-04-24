import {memo} from 'react';
import {Table, Text} from '@chakra-ui/react';

import {TitleCell} from './title-cell';
import {ActionsCell} from './actions-cell';

import type {ComponentProps, FC} from 'react';
import type {Track} from '@entities/track';


type Props = {
	activeTracks: Array<Track>,
	onTrackEdit: (track: Track) => void,
	onTrackDelete: (track: Track) => void,
} & Omit<ComponentProps<typeof Table.Root>, 'children'>;

export const TracksTable: FC<Props> = memo(function TracksTable({
	activeTracks,
	onTrackEdit,
	onTrackDelete,
	...restProps
}) {
	return (
		<Table.Root {...restProps}>
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
				{activeTracks.map((track) => {
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
						onTrackEdit(track);
					};

					const onDeleteButtonClick = (): void => {
						onTrackDelete(track);
					};

					return (
						<Table.Row key={id}>
							<Table.Cell>
								<TitleCell
									title={title}
									artist={artist}
									coverImage={coverImage}
									createdAt={createdAt}
									updatedAt={updatedAt}
								/>
							</Table.Cell>

							<Table.Cell>{album}</Table.Cell>

							<Table.Cell justifyItems="end">
								<ActionsCell
									onEdit={onEditButtonClick}
									onDelete={onDeleteButtonClick}
								/>
							</Table.Cell>
						</Table.Row>
					);
				})}
			</Table.Body>
		</Table.Root>
	);
});
