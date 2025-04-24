import {forwardRef} from 'react';
import {Field as ChakraField} from '@chakra-ui/react';

import type {ReactNode} from 'react';
import type {FieldRootProps} from '@chakra-ui/react';


type Props = {
	label?: ReactNode | undefined,
	helperText?: ReactNode,
	errorText?: ReactNode,
	optionalText?: ReactNode,
} & Omit<FieldRootProps, 'label' | 'helperText' | 'errorText' | 'optionalText'>;

const Field = forwardRef<HTMLDivElement, Props>(
	function Field({
		label,
		children,
		helperText,
		errorText,
		optionalText,
		...rest
	}, ref) {
		return (
			<ChakraField.Root ref={ref} invalid={!!errorText} {...rest}>
				{label ? (
					<ChakraField.Label>
						{label}

						<ChakraField.RequiredIndicator fallback={optionalText}/>
					</ChakraField.Label>
				) : null}

				{children}

				{helperText ? (
					<ChakraField.HelperText>
						{helperText}
					</ChakraField.HelperText>
				) : null}

				{errorText ? (
					<ChakraField.ErrorText>
						{errorText}
					</ChakraField.ErrorText>
				) : null}
			</ChakraField.Root>
		);
	},
);

export default Field;
