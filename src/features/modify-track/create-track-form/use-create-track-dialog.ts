import {useDialog} from '@chakra-ui/react';

import {useStableCallback} from '@shared/hooks';


type ReturnParams = {
	isCreateTrackDialogOpen: boolean,
	openCreateTrackDialog: () => void,
	closeCreateTrackDialog: () => void,
	changeCreateTrackDialog: (isOpen: boolean) => void,
};

export const useCreateTrackDialog = (): ReturnParams => {
	// WHY: library types are a bit incorrect
	// eslint-disable-next-line typescript/unbound-method
	const {open, setOpen} = useDialog();

	const openDialog = useStableCallback((): void => {
		setOpen(true);
	});

	const closeDialog = useStableCallback((): void => {
		setOpen(false);
	});

	return {
		isCreateTrackDialogOpen: open,
		openCreateTrackDialog: openDialog,
		closeCreateTrackDialog: closeDialog,
		changeCreateTrackDialog: setOpen,
	};
};
