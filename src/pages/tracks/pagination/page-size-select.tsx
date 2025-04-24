import {memo} from 'react';
import {Select, Portal, createListCollection} from '@chakra-ui/react';

import {isNumber} from '@shared/utils';

import type {ComponentProps, FC} from 'react';


type SelectItem = {
	value: string,
	label: string,
};

const availablePageSizes = createListCollection(
	[5, 10, 25, 50].reduce<{items: Array<SelectItem>}>((acc, pageSize) => {
		acc.items.push({
			value: String(pageSize),
			label: `${pageSize} tracks per page`,
		});

		return acc;
	}, {items: []}),
);

type OnPageSizeChange = NonNullable<ComponentProps<typeof Select.Root>['onValueChange']>;

type Props = {
	activePageSize: number,
	onPageSizeChange: (pageSize: number) => void,
} & Omit<ComponentProps<typeof Select.Root>, 'collection' | 'value' | 'onValueChange'>;

export const PageSizeSelect: FC<Props> = memo(function PageSizeSelect({
	activePageSize,
	onPageSizeChange,
}) {
	const handlePageSizeChange: OnPageSizeChange = (details): void => {
		const pageSize = details.value.length
			? Number(details.value[0])
			: undefined;

		if (isNumber(pageSize)) {
			onPageSizeChange(pageSize);
		}
	};

	return (
		<Select.Root
			collection={availablePageSizes}
			value={[String(activePageSize)]}
			onValueChange={handlePageSizeChange}
		>
			<Select.Control>
				<Select.Trigger>
					<Select.ValueText placeholder="Select page size"/>
				</Select.Trigger>

				<Select.IndicatorGroup>
					<Select.Indicator/>
				</Select.IndicatorGroup>
			</Select.Control>

			<Portal>
				<Select.Positioner>
					<Select.Content>
						{availablePageSizes.items.map(({value, label}) => (
							<Select.Item key={value} item={value}>
								{label}

								<Select.ItemIndicator/>
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
		</Select.Root>
	);
});
