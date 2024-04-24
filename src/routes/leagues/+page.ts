import { getLeagues } from '$lib/api';
import type { League } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	let leagues: League[] = [];
	try {
		leagues = await getLeagues({ fetch });
	} catch (e) {
		console.error(e);
	}

	return {
		leagues
	};
}) satisfies PageLoad;
