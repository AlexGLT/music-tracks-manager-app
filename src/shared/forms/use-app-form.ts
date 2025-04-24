import {createFormHook} from '@tanstack/react-form';

import {fieldContext, formContext} from './form-context';
import {TextField, TagListField} from './fields';


export const {useAppForm} = createFormHook({
	fieldComponents: {
		TextField,
		TagListField,
	},
	formComponents: {},
	fieldContext,
	formContext,
});
