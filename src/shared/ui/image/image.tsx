import {useState} from 'react';

import {
	Box,
	Image as ChakraImage,
	Skeleton,
} from '@chakra-ui/react';

import type {FC, SyntheticEvent} from 'react';
import type {ImageProps} from '@chakra-ui/react';


type Props = ImageProps & {
	fallbackSrc?: string,
};

const Image: FC<Props> = ({
	fallbackSrc,
	src,
	width,
	height,
	rounded,
	onLoad,
	onError,
	...restProps
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [srcWithFallback, setSrcWithFallback] = useState(src || fallbackSrc);

	const handleLoad = (event: SyntheticEvent<HTMLImageElement>): void => {
		setIsLoaded(true);

		onLoad?.(event);
	};

	const handleError = (event: SyntheticEvent<HTMLImageElement>): void => {
		setSrcWithFallback(fallbackSrc);

		onError?.(event);
	};

	return (
		<Box position="relative">
			<ChakraImage
				{...restProps}
				src={srcWithFallback}
				rounded={rounded}
				height={height}
				width={width}
				onLoad={handleLoad}
				onError={handleError}
			/>

			{!isLoaded || !srcWithFallback ? (
				<Box pos="absolute" inset="0">
					<Skeleton
						rounded={rounded}
						height={height}
						width={width}
					/>
				</Box>
			) : null}
		</Box>
	);
};

export default Image;
