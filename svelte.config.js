import vercel from '@sveltejs/adapter-vercel';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		runes: true
	},
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),
	kit: {
		adapter: vercel(),
		alias: {
			'@api': 'src/api',
			'@components': 'src/components',
			'@data': 'src/data',
			'@utils': 'src/utils'
		}
	}
};

export default config;
