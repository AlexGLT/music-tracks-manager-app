import {Flex, IconButton} from '@chakra-ui/react';
import {HiOutlinePencil, HiOutlineTrash} from 'react-icons/hi';

import type {FC} from 'react';


type Props = {
	onEdit: () => void,
	onDelete: () => void,
};

export const ActionsCell: FC<Props> = ({
	onEdit,
	onDelete,
}) => {
	return (
		<Flex gap="2">
			<IconButton
				variant="outline"
				colorPalette="yellow"
				onClick={onEdit}
			>
				<HiOutlinePencil/>
			</IconButton>

			<IconButton
				variant="outline"
				colorPalette="red"
				onClick={onDelete}
			>
				<HiOutlineTrash/>
			</IconButton>
		</Flex>
	);
};
