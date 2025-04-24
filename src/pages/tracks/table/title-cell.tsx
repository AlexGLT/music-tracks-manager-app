import {
	Popover,
	Box,
	IconButton,
	Portal,
	Flex,
	Text,
} from '@chakra-ui/react';

import {HiOutlineClock} from 'react-icons/hi';

import DefaultTrackCover from '@assets/default-track-cover.png';
import Image from '@shared/ui/image';
import Tooltip from '@shared/ui/tooltip';

import type {FC} from 'react';


type Props = {
	title: string,
	artist: string,
	coverImage: string | undefined,
	createdAt: string | undefined,
	updatedAt: string | undefined,
};

export const TitleCell: FC<Props> = ({
	title,
	artist,
	coverImage,
	createdAt,
	updatedAt,
}) => {
	return (
		<Flex justify="space-between">
			<Flex gap="4">
				<Image
					src={coverImage}
					fallbackSrc={DefaultTrackCover}
					alt={`${title} by ${artist} cover`}
					rounded="md"
					height="48px"
					width="48px"
					fit="contain"
				/>

				<Flex direction="column">
					<Text fontWeight="semibold">
						{title}
					</Text>

					<Text fontSize="small">
						{artist}
					</Text>
				</Flex>
			</Flex>

			<Popover.Root>
				<Tooltip content="Click to see creating and updating times" positioning={{placement: 'top'}}>
					<Box display="inline-block">
						<Popover.Trigger asChild={true}>
							<IconButton variant="surface" size="2xs">
								<HiOutlineClock/>
							</IconButton>
						</Popover.Trigger>
					</Box>
				</Tooltip>

				<Portal>
					<Popover.Positioner>
						<Popover.Content width="auto">
							<Popover.Arrow/>

							<Popover.Body>
								<Flex direction="column" gap="2">
									{createdAt ? (
										<Text>
											<b>Created at</b>
											&nbsp;
											<span>{new Date(createdAt).toLocaleDateString()}</span>
										</Text>
									) : null}

									{updatedAt && updatedAt !== createdAt ? (
										<Text>
											<b>Updated at</b>
											&nbsp;
											<span>{new Date(updatedAt).toLocaleDateString()}</span>
										</Text>
									) : null}
								</Flex>
							</Popover.Body>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
		</Flex>
	);
};
