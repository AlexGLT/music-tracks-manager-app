import {useState} from 'react';

import {useStableCallback} from '@shared/hooks';


const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

type ReturnParams = {
	activePageNumber: number,
	activePageSize: number,
	changePageNumber: (pageNumber: number) => void,
	changePageSize: (pageSize: number) => void,
	resetPageNumber: () => void,
};

export const usePagination = (): ReturnParams => {
	const [activePageNumber, setActivePageNumber] = useState(DEFAULT_PAGE_NUMBER);
	const [activePageSize, setActivePageSize] = useState(DEFAULT_PAGE_SIZE);

	const resetPageNumber = useStableCallback((): void => {
		setActivePageNumber(DEFAULT_PAGE_NUMBER);
	});

	return {
		activePageNumber,
		activePageSize,
		resetPageNumber,
		changePageNumber: setActivePageNumber,
		changePageSize: setActivePageSize,
	};
};
