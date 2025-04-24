import {forwardRef} from 'react';
import {Tooltip as ChakraTooltip, Portal} from '@chakra-ui/react';

import type {RefObject, ReactNode, ComponentProps} from 'react';


type Props = {
	showArrow?: boolean,
	portalled?: boolean,
	portalRef?: RefObject<HTMLElement>,
	content: ReactNode,
	contentProps?: ChakraTooltip.ContentProps,
	disabled?: boolean,
} & ComponentProps<typeof ChakraTooltip.Root>;

const Tooltip = forwardRef<HTMLDivElement, Props>(
	function Tooltip({
		showArrow,
		children,
		disabled,
		portalled = true,
		content,
		contentProps,
		portalRef,
		...rest
	}, ref) {
		if (disabled) {
			return children;
		}

		return (
			<ChakraTooltip.Root {...rest}>
				<ChakraTooltip.Trigger asChild={true}>{children}</ChakraTooltip.Trigger>

				<Portal disabled={!portalled} container={portalRef}>
					<ChakraTooltip.Positioner>
						<ChakraTooltip.Content ref={ref} {...contentProps}>
							{showArrow ? (
								<ChakraTooltip.Arrow>
									<ChakraTooltip.ArrowTip/>
								</ChakraTooltip.Arrow>
							) : null}

							{content}
						</ChakraTooltip.Content>
					</ChakraTooltip.Positioner>
				</Portal>
			</ChakraTooltip.Root>
		);
	},
);

export default Tooltip;
