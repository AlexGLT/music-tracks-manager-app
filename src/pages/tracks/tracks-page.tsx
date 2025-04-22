import {Table} from '@chakra-ui/react';

import {useAvailableTracks} from './hooks';

import type {FC} from 'react';


const TracksPage: FC = () => {
	const {isPending, availableTracks} = useAvailableTracks();

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div style={{maxWidth: '600px', margin: '0 auto'}}>
			<Table.Root>
				<Table.Header>
					<Table.Row>
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
					}) => {
						return (
							<Table.Row key={id}>
								<Table.Cell>{title}</Table.Cell>

								<Table.Cell>{artist}</Table.Cell>

								<Table.Cell>{album}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default TracksPage;
