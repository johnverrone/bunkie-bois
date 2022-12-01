import { invalid } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';
import type { Actions } from './$types';

export const actions: Actions = {
	addPlayer: async ({ request }) => {
		const data = await request.formData();
		const stringTripId = data.get('tripId');
		const name = data.get('name');
		const stringHandicap = data.get('handicap');

		if (
			!stringTripId ||
			!name ||
			!stringHandicap ||
			typeof stringTripId !== 'string' ||
			typeof name !== 'string' ||
			typeof stringHandicap !== 'string'
		) {
			return invalid(400, {});
		}

		const tripId = parseInt(stringTripId);
		const handicap = parseFloat(stringHandicap);
		const { error } = await supabase
			.from('trip_players')
			.insert({ trip_id: tripId, name, handicap });

		if (error) throw new Error(error.message);
	},
	updatePlayer: async ({ request }) => {
		const data = await request.formData();
		const stringTripId = data.get('tripId');
		const stringPlayerId = data.get('playerId');
		const name = data.get('name');
		const stringHandicap = data.get('handicap');

		if (
			!stringTripId ||
			!stringPlayerId ||
			!name ||
			!stringHandicap ||
			typeof stringTripId !== 'string' ||
			typeof stringPlayerId !== 'string' ||
			typeof name !== 'string' ||
			typeof stringHandicap !== 'string'
		) {
			throw new Error('failed to parse form data');
		}

		const tripId = parseInt(stringTripId);
		const playerId = parseInt(stringPlayerId);
		const handicap = parseFloat(stringHandicap);
		const { error } = await supabase
			.from('trip_players')
			.update({ name, handicap })
			.eq('trip_id', tripId)
			.eq('player_id', playerId);

		if (error) throw new Error(error.message);
	}
};
