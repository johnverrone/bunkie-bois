import * as api from '@api';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) throw redirect(303, '/');

	const {
		params: { tripId }
	} = event;

	const trip = await api.getTripById(supabaseClient, tripId);
	const tripPlayers = await api.getPlayers(supabaseClient, tripId);
	const rounds = await api.getRounds(supabaseClient, tripId);

	return {
		title: trip.name ?? 'unknown',
		trip,
		tripPlayers,
		rounds
	};
}) satisfies LayoutLoad;
