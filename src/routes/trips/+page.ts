import { getTrips } from '$lib/api';
import type { Trip } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	let trips: Trip[] = [];
	try {
		trips = await getTrips({ fetch });
	} catch (e) {
		console.error(e);
	}

	return {
		trips
	};
}) satisfies PageLoad;
