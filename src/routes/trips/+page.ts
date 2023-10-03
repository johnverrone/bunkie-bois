import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { getTrips } = await makeSupabaseAPI(event);

	return {
		trips: await getTrips()
	};
}) satisfies PageLoad;
