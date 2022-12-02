import { supabase } from '$lib/server/supabaseClient';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { data: trip, error: tripError } = await supabase
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

	const { data: tripPlayersData, error: tripPlayersError } = await supabase
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

	if (trip) {
		return {
			id: trip.id,
			name: trip.name,
			title: trip.name,
			tripPlayers,
			rounds: [] as { id: string; courseName: string }[] // tripRounds
		};
	}

	throw error(404, 'Trip not found');
};
