import { getCourses, getPlayers, getRounds, getTripById } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load = (async ({ depends, params, fetch }) => {
	const { tripId } = params;
	depends(`trips:${tripId}`);

	const trip = await getTripById(tripId, { fetch });
	const tripPlayers = await getPlayers(tripId, { fetch });
	const rounds = await getRounds(tripId, { fetch });
	const courses = await getCourses({ fetch });

	return {
		title: trip.name,
		trip,
		tripPlayers,
		rounds,
		courses: courses
	};
}) satisfies LayoutLoad;
