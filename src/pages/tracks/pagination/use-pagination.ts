import {useState} from 'react';


const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_SIZE = 10;

type ReturnParams = {
	activePageNumber: number,
	activePageSize: number,
	changePageNumber: (pageNumber: number) => void,
	changePageSize: (pageSize: number) => void,
};

export const usePagination = (): ReturnParams => {
	const [activePageNumber, setActivePageNumber] = useState(DEFAULT_PAGE_NUMBER);
	const [activePageSize, setActivePageSize] = useState(DEFAULT_PAGE_SIZE);

	return {
		activePageNumber,
		activePageSize,
		changePageNumber: setActivePageNumber,
		changePageSize: setActivePageSize,
	};
};
