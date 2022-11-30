import { supabase } from '$lib/supabaseClient';
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

	const { data: players, error: playersError } = await supabase
		.from('players')
		.select(
			`
			id,
			name,
			trips ( id )
		`
		)
		.eq('trips.id', params.tripId);

	console.log(players);

	if (playersError) {
		throw error(500, {
			message: playersError.message
		});
	}

	if (trip) {
		// const tripRounds = trip.roundIds
		// 	?.map((roundId) => rounds.find((round) => round.id === roundId))
		// 	.filter((round): round is Round => !!round);

		return {
			id: trip.id,
			name: trip.name,
			players,
			rounds: [] // tripRounds
		};
	}

	throw error(404, 'Trip not found');
};
