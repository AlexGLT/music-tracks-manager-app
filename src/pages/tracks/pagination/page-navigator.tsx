import {memo} from 'react';
import {HiChevronLeft, HiChevronRight} from 'react-icons/hi';

import {
	ButtonGroup,
	IconButton,
	Pagination,
	Show,
} from '@chakra-ui/react';

import type {ComponentProps, FC} from 'react';


type OnPageChange = NonNullable<ComponentProps<typeof Pagination.Root>['onPageChange']>;

type Props = {
	totalTracks: number,
	activePageSize: number,
	activePageNumber: number,
	onPageNumberChange: (pageNumber: number) => void,
} & Omit<ComponentProps<typeof Pagination.Root>, 'count' | 'page' | 'pageSize' | 'onPageChange' | 'children'>;

export const PageNavigator: FC<Props> = memo(function PageNavigator({
	totalTracks,
	activePageNumber,
	activePageSize,
	onPageNumberChange,
}) {
	const handlePageChange: OnPageChange = (details): void => {
		onPageNumberChange(details.page);
	};

	return (
		<Show when={totalTracks > activePageSize}>
			<Pagination.Root
				count={totalTracks}
				page={activePageNumber}
				pageSize={activePageSize}
				onPageChange={handlePageChange}
			>
				<ButtonGroup variant="ghost" size="md">
					<Pagination.PrevTrigger asChild={true}>
						<IconButton>
							<HiChevronLeft/>
						</IconButton>
					</Pagination.PrevTrigger>

					<Pagination.Items
						render={(page) => (
							<IconButton variant={{base: 'ghost', _selected: 'outline'}}>
								{page.value}
							</IconButton>
						)}
					/>

					<Pagination.NextTrigger asChild={true}>
						<IconButton>
							<HiChevronRight/>
						</IconButton>
					</Pagination.NextTrigger>
				</ButtonGroup>
			</Pagination.Root>
		</Show>
	);
});
