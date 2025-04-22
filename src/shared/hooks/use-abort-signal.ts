import {useCallback, useRef} from 'react';


type ReturnParams = {
	createAbortSignal: () => AbortSignal,
	abort: () => void,
};

export const useAbortSignal = (): ReturnParams => {
	const abortControllerRef = useRef<AbortController | undefined>(undefined);

	const createAbortSignal = useCallback((): AbortSignal => {
		const abortController = new AbortController();
		abortControllerRef.current = abortController;

		return abortController.signal;
	}, []);

	const abort = useCallback(() => {
		abortControllerRef.current?.abort();
	}, []);

	return {
		createAbortSignal,
		abort,
	};
};
