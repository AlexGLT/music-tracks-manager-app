export const isObject = (value: unknown): value is object => {
	return !!value && typeof value === 'object';
};
