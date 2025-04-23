import {Box, Center, Spinner} from '@chakra-ui/react';

import * as classes from './progress-box.module.scss';

import type {FC, PropsWithChildren} from 'react';
import type {BoxProps, SpinnerProps} from '@chakra-ui/react';


type Props = PropsWithChildren<{
	isLoading: boolean,
	boxProps?: BoxProps,
	spinnerProps?: SpinnerProps,
}>;

const ProgressBox: FC<Props> = ({
	isLoading,
	boxProps,
	spinnerProps,
	children,
}) => {
	return (
		<Box
			position="relative"
			userSelect={isLoading ? 'none' : undefined}
			{...boxProps}
		>
			{children}

			{isLoading ? (
				<Box
					pos="absolute"
					inset="0"
					className={classes.overlay}
				>
					<Center h="full">
						<Spinner {...spinnerProps}/>
					</Center>
				</Box>
			) : null}
		</Box>
	);
};

export default ProgressBox;
