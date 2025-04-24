import {Input} from '@chakra-ui/react';

import Field from '@shared/ui/field';

import {useFieldContext} from '../form-context';

import type {ChangeEvent, ComponentProps, FC} from 'react';


type Props = {
	label: string,
	isRequired?: boolean,
} & ComponentProps<typeof Input>;

export const TextField: FC<Props> = ({label, isRequired, ...restProps}) => {
	const {state, handleChange, handleBlur} = useFieldContext<string>();
	const {meta: {errors, isTouched}, value} = state;
	// eslint-disable-next-line typescript/no-unsafe-member-access
	const errorMessage = isTouched ? errors[0]?.message as string : undefined;

	const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
		handleChange(event.target.value);
	};

	return (
		<Field
			label={label}
			required={isRequired}
			invalid={!!errorMessage}
			errorText={errorMessage}
		>
			<Input
				{...restProps}
				value={value}
				onChange={onChange}
				onBlur={handleBlur}
			/>
		</Field>
	);
};
