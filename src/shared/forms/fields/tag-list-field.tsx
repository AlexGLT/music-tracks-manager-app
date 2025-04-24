import {
	IconButton,
	Menu,
	Portal,
	Show,
	Wrap,
} from '@chakra-ui/react';

import {HiOutlinePlusCircle} from 'react-icons/hi';
import {difference, without} from 'es-toolkit';
import {useRef} from 'react';

import Field from '@shared/ui/field';
import Tag from '@shared/ui/tag';

import {useFieldContext} from '../form-context';

import type {FC, RefObject} from 'react';
import type {WrapProps} from '@chakra-ui/react';


type Props = {
	label: string,
	isRequired?: boolean,
	allTags: Array<string>,
	portalRef?: RefObject<HTMLDivElement | null>,
} & WrapProps;

export const TagListField: FC<Props> = ({
	label,
	isRequired,
	allTags,
	portalRef,
	...restProps
}) => {
	const addButtonRef = useRef<HTMLButtonElement>(null);

	const {state, handleChange} = useFieldContext<Array<string>>();
	const {meta: {errors, isTouched}, value} = state;
	// eslint-disable-next-line typescript/no-unsafe-member-access
	const errorMessage = isTouched ? errors[0]?.message as string : undefined;

	const unselectedTags = difference(allTags, value);

	const onGenreAdd = (genre: string): void => {
		handleChange(value.concat(genre));
		addButtonRef.current?.focus();
	};

	const onGenreRemove = (genre: string): void => {
		handleChange(without(value, genre));
	};

	return (
		<Field
			label={label}
			required={isRequired}
			invalid={!!errorMessage}
			errorText={errorMessage}
		>
			<Wrap {...restProps}>
				{value.map((genre) => {
					const onClose = (): void => {
						onGenreRemove(genre);
					};

					return (
						<Tag
							key={genre}
							variant="surface"
							size="lg"
							onClose={onClose}
						>
							{genre}
						</Tag>
					);
				})}

				<Show when={unselectedTags.length}>
					<Tag padding={0} size="lg">
						<Menu.Root>
							<Menu.Trigger asChild={true}>
								<IconButton
									ref={addButtonRef}
									variant="ghost"
									rounded="full"
									size="xs"
								>
									<HiOutlinePlusCircle/>
								</IconButton>

							</Menu.Trigger>

							<Portal container={portalRef}>
								<Menu.Positioner>
									<Menu.Content>
										{unselectedTags.map((genre) => {
											const onAdd = (): void => {
												onGenreAdd(genre);
											};

											return (
												<Menu.Item
													key={genre}
													value={genre}
													onClick={onAdd}
												>
													{genre}
												</Menu.Item>
											);
										})}
									</Menu.Content>
								</Menu.Positioner>
							</Portal>
						</Menu.Root>
					</Tag>
				</Show>
			</Wrap>
		</Field>
	);
};
