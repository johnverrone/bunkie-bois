import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { makeSupabaseAPI } from '@api';

export const load = (async (event) => {
	const { session, getTripById, getPlayers, getRounds } = await makeSupabaseAPI(event);
	if (!session) throw redirect(303, '/');

	const {
		params: { tripId }
	} = event;

	const trip = await getTripById(tripId);
	const tripPlayers = await getPlayers(tripId);
	const rounds = await getRounds(tripId);

	return {
		title: trip.name ?? 'unknown',
		trip,
		tripPlayers,
		rounds
	};
}) satisfies LayoutLoad;
