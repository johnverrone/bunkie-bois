import { getCourses, getPlayers, getRounds, getTripById } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load = (async ({ depends, params, fetch }) => {
	const { tripId } = params;
	depends(`trips:${tripId}`);

	const trip = await getTripById(tripId, { fetch });
	const tripPlayers = await getPlayers(tripId, { fetch });
	const allPlayers = await getPlayers(undefined, { fetch });
	const rounds = await getRounds(tripId, { fetch });
	const courses = await getCourses({ fetch });

	const sortedRounds = rounds.sort((a, b) =>
		a.date && b.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0
	);

	return {
		title: trip.name,
		trip,
		tripPlayers,
		allPlayers,
		rounds: sortedRounds,
		courses
	};
}) satisfies LayoutLoad;
