import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { title } = await parent();
	return {
		title: title ? `${title} | Games` : 'Games'
	};
}) satisfies PageLoad;