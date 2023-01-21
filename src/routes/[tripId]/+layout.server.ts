import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) throw redirect(303, '/');

	const { params } = event;

	const { data: trip, error: tripError } = await supabaseClient
		.from('trips')
		.select()
		.eq('id', params.tripId)
		.limit(1)
		.single();

	if (tripError) {
		throw error(500, {
			message: tripError.message
		});
	}

	const { data: tripPlayersData, error: tripPlayersError } = await supabaseClient
		.from('trip_players')
		.select()
		.eq('trip_id', params.tripId);

	if (tripPlayersError) {
		throw error(500, {
			message: tripPlayersError.message
		});
	}

	const tripPlayers = tripPlayersData.map((player) => ({
		id: player.player_id,
		name: player.name,
		handicap: player.handicap
	}));

	const { data: roundsData, error: roundsError } = await supabaseClient
		.from('rounds')
		.select()
		.eq('trip_id', params.tripId);

	if (roundsError) {
		throw error(500, {
			message: roundsError.message
		});
	}

	const rounds = roundsData.map(({ id, name, date }) => ({
		id,
		name,
		date: date ? new Date(date) : null
	}));

	if (trip) {
		return {
			id: trip.id,
			name: trip.name,
			title: trip.name,
			tripPlayers,
			rounds
		};
	}

	throw error(404, 'Trip not found');
}) satisfies LayoutServerLoad;
