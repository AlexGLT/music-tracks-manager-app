import {useMemo} from 'react';
import {useStore} from '@tanstack/react-form';
import {isEqual} from 'es-toolkit';

import {useAppForm} from '@shared/forms/use-app-form';

import {ModifiedTrackSchema} from './model';

import type {ModifiedTrack} from './model';


type Params = {
	defaultValues: ModifiedTrack,
	onSubmit: (value: ModifiedTrack) => Promise<boolean>,
};

// eslint-disable-next-line
export const useModifyTrackForm = ({defaultValues, onSubmit}: Params) => {
	const form = useAppForm({
		defaultValues,
		validators: {
			onChange: ModifiedTrackSchema,
		},
		onSubmit: ({value}) => {
			onSubmit(value);
		},
	});

	const [currentFormValues, canBeSubmitted] = useStore(
		form.store,
		(state) => [
			state.values,
			state.canSubmit,
		],
	);

	const canBeCleared = useMemo(() => {
		return !isEqual(
			currentFormValues,
			form.options.defaultValues,
		);
	}, [
		currentFormValues,
		form.options.defaultValues,
	]);

	const handleSubmit = (): void => {
		form.handleSubmit();
	};

	const handleReset = (): void => {
		form.reset();
	};

	return {
		form,
		canBeSubmitted,
		canBeCleared,
		handleSubmit,
		handleReset,
	};
};
