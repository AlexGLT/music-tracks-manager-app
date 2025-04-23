import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import {pluginSass} from '@rsbuild/plugin-sass';


export default defineConfig({
	plugins: [
		pluginReact(),
		pluginSass(),
	],
	html: {
		template: './index.html',
	},
	source: {
		entry: {
			index: './src/app/index.tsx',
		},
	},
	output: {
		cssModules: {
			exportGlobals: true,
			namedExport: true,
		},
	},
});
