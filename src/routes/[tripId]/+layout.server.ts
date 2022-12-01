import { supabase } from '$lib/server/supabaseClient';
import { error } from '@sveltejs/kit';
import type { Player } from 'src/data/players';
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
		.select(
			`
			trip_id,
			player_id,
			handicap,
			name
		`
		)
		.eq('trip_id', params.tripId);

	if (tripPlayersError) {
		throw error(500, {
			message: tripPlayersError.message
		});
	}

	const tripPlayers = tripPlayersData.map<Player>((player) => ({
		id: player.player_id.toString(),
		name: player.name,
		handicap: player.handicap
	}));

	if (trip) {
		// const tripRounds = trip.roundIds
		// 	?.map((roundId) => rounds.find((round) => round.id === roundId))
		// 	.filter((round): round is Round => !!round);

		return {
			id: trip.id,
			name: trip.name,
			tripPlayers,
			rounds: [] // tripRounds
		};
	}

	throw error(404, 'Trip not found');
};
