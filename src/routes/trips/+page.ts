import { getTrips } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ depends }) => {
	depends('trips');

	return {
		trips: await getTrips()
	};
}) satisfies PageLoad;
