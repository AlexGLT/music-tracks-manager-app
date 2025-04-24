import {
	Button,
	CloseButton,
	Dialog,
	Flex,
	Popover,
	Portal,
	Text,
} from '@chakra-ui/react';

import type {
	ComponentProps,
	FC,
	PropsWithChildren,
	RefObject,
} from 'react';


type OnOpenChange = NonNullable<ComponentProps<typeof Dialog.Root>['onOpenChange']>;

type Props = PropsWithChildren<{
	dialogRef: RefObject<HTMLDivElement | null>,
	initialElementRef: RefObject<HTMLElement | null>,
	canBeSubmitted: boolean,
	canBeCleared: boolean,
	isOpen: boolean,
	onSubmit?: () => void,
	onReset?: () => void,
	onClose: () => void,
}>;

export const ModifyTrackDialog: FC<Props> = ({
	dialogRef,
	initialElementRef,
	canBeSubmitted,
	canBeCleared,
	isOpen,
	onSubmit,
	onReset,
	onClose,
	children,
}) => {
	const handleOpenChange: OnOpenChange = ({open}) => {
		if (!open) {
			onClose();
		}
	};

	return (
		<Dialog.Root
			size="lg"
			placement="center"
			lazyMount={true}
			open={isOpen}
			onOpenChange={handleOpenChange}
			initialFocusEl={() => initialElementRef.current}
		>
			<Portal>
				<Dialog.Backdrop/>

				<Dialog.Positioner>
					<Dialog.Content ref={dialogRef}>
						<Dialog.Header>
							<Dialog.Title>Edit Track</Dialog.Title>
						</Dialog.Header>

						<Dialog.Body>
							<Flex direction="column" gap={4}>
								{children}
							</Flex>
						</Dialog.Body>

						<Dialog.Footer justifyContent="space-between">
							<Flex gap="4">
								<Dialog.ActionTrigger asChild={true}>
									<Button
										type="submit"
										colorPalette="blue"
										disabled={!canBeCleared || !canBeSubmitted}
										onClick={onSubmit}
									>
										Save
									</Button>
								</Dialog.ActionTrigger>

								<Button
									type="reset"
									variant="ghost"
									disabled={!canBeCleared}
									onClick={onReset}
								>
									Clear Changes
								</Button>
							</Flex>

							{!canBeCleared ? (
								<Dialog.ActionTrigger asChild={true}>
									<Button variant="outline">
										Cancel
									</Button>
								</Dialog.ActionTrigger>
							) : (
								<Popover.Root>
									<Popover.Trigger asChild={true}>
										<Button variant="outline">
											Cancel
										</Button>
									</Popover.Trigger>

									<Portal>
										<Popover.Positioner>
											<Popover.Content>
												<Popover.Arrow/>

												<Popover.Body padding="4">
													<Flex direction="column" gap="4">
														<Text fontWeight="semibold">
															Unsaved changes will be discarded. Continue?
														</Text>

														<Flex justifyContent="space-between">
															<Popover.CloseTrigger asChild={true}>
																<Button variant="outline" width="25%">
																	No
																</Button>
															</Popover.CloseTrigger>

															<Dialog.ActionTrigger asChild={true}>
																<Button colorPalette="red" width="25%">
																	Yes
																</Button>
															</Dialog.ActionTrigger>
														</Flex>

													</Flex>
												</Popover.Body>
											</Popover.Content>
										</Popover.Positioner>
									</Portal>
								</Popover.Root>
							)}
						</Dialog.Footer>

						<Dialog.CloseTrigger asChild={true}>
							<CloseButton size="sm"/>
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};
