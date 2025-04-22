export const isString = (value: unknown, allowEmpty: boolean = true): value is string => {
	return typeof value === 'string' && (allowEmpty || !!value);
};
