import { getCourses, getPlayers, getRounds, getTripById } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load = (async ({ depends, params }) => {
	const { tripId } = params;
	depends(`trips:${tripId}`);

	const trip = await getTripById(tripId);
	const tripPlayers = await getPlayers(tripId);
	const rounds = await getRounds(tripId);
	const courses = await getCourses();

	return {
		title: trip.name,
		trip,
		tripPlayers,
		rounds,
		courses: courses
	};
}) satisfies LayoutLoad;
