import { error, invalid } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';
import type { Actions } from './$types';
import { z } from 'zod';

export const actions: Actions = {
	addPlayer: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			tripId: z.preprocess((id) => parseInt(z.string().parse(id)), z.number()),
			name: z.string(),
			handicap: z.preprocess((h) => parseFloat(z.string().parse(h)), z.number())
		});

		try {
			const { tripId: trip_id, name, handicap } = playerSchema.parse(data);

			const { error: pgError } = await supabase
				.from('trip_players')
				.insert({ trip_id, name, handicap });

			if (pgError) return error(500, pgError.message);
		} catch (error) {
			return invalid(400, { message: `failed to parse player, ${error}` });
		}
	},
	updatePlayer: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			tripId: z.preprocess((id) => parseInt(z.string().parse(id)), z.number()),
			playerId: z.preprocess((id) => parseInt(z.string().parse(id)), z.number()),
			name: z.string(),
			handicap: z.preprocess((h) => parseFloat(z.string().parse(h)), z.number())
		});

		try {
			const { tripId, playerId, name, handicap } = playerSchema.parse(data);

			const { error: pgError } = await supabase
				.from('trip_players')
				.update({ name, handicap })
				.eq('trip_id', tripId)
				.eq('player_id', playerId);

			if (pgError) return error(500, pgError.message);
		} catch (error) {
			return invalid(400, { message: `failed to parse player, ${error}` });
		}
	}
};
