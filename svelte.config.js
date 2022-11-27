import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		trailingSlash: 'ignore' // vercel build failing without this (@sveltejs/adapter-vercel v1.0.0-next.84)
	}
};

export default config;
