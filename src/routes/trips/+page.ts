import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { getTrips } = await makeSupabaseAPI(event);

	const trips = await getTrips();

	return {
		trips
	};
}) satisfies PageLoad;
