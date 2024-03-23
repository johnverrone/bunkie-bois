import { getTrips } from '$lib/api';
import type { Trip } from '$lib/pocketbase';
import type { PageLoad } from './$types';

export const load = (async ({ depends }) => {
	depends('trips');

	let trips: Trip[] = [];
	try {
		trips = await getTrips();
	} catch (e) {
		console.error(e);
	}

	return {
		trips
	};
}) satisfies PageLoad;
