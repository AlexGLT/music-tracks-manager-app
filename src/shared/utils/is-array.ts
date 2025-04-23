export const isArray = (value: unknown): value is Array<unknown> => {
	return !!value && Array.isArray(value);
};
