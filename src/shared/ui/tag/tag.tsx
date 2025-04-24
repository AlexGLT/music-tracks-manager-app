import {forwardRef} from 'react';
import {Tag as ChakraTag} from '@chakra-ui/react';

import type {ReactNode} from 'react';


type TagProps = {
	startElement?: ReactNode,
	endElement?: ReactNode,
	onClose?: () => void,
	closable?: boolean,
} & ChakraTag.RootProps;

const Tag = forwardRef<HTMLSpanElement, TagProps>(
	function Tag({
		startElement,
		endElement,
		onClose,
		closable = !!onClose,
		children,
		...rest
	}, ref) {
		return (
			<ChakraTag.Root ref={ref} {...rest}>
				{startElement ? (
					<ChakraTag.StartElement>
						{startElement}
					</ChakraTag.StartElement>
				) : null}

				<ChakraTag.Label>
					{children}
				</ChakraTag.Label>

				{endElement ? (
					<ChakraTag.EndElement>{endElement}</ChakraTag.EndElement>
				) : null}

				{closable ? (
					<ChakraTag.EndElement>
						<ChakraTag.CloseTrigger cursor="pointer" onClick={onClose}/>
					</ChakraTag.EndElement>
				) : null}
			</ChakraTag.Root>
		);
	},
);

export default Tag;
