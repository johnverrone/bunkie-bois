import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions = {
	addPlayer: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			tripId: z.coerce.number(),
			name: z.string(),
			handicap: z.coerce.number()
		});

		try {
			const { tripId, name, handicap } = playerSchema.parse(data);

			const { data: player, error: pgError } = await supabaseClient
				.from('players')
				.insert({ name, handicap })
				.select('id')
				.single();

			if (pgError) return fail(500, { message: pgError.message });

			const { error: tripPlayerError } = await supabaseClient
				.from('trip_players')
				.insert({ player_id: player.id, trip_id: tripId });

			if (tripPlayerError) return fail(500, { message: tripPlayerError.message});
		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
	updatePlayer: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			playerId: z.coerce.number(),
			name: z.string(),
			handicap: z.coerce.number()
		});

		try {
			const { playerId, name, handicap } = playerSchema.parse(data);

			const { error: pgError } = await supabaseClient
				.from('players')
				.update({ name, handicap })
				.eq('id', playerId);

			if (pgError) return fail(500, { message: pgError.message});
		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
	deletePlayer: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const deleteSchema = z.object({
			tripId: z.coerce.number(),
			playerId: z.coerce.number()
		});

		try {
			const { tripId, playerId } = deleteSchema.parse(data);

			const { error: tripPlayerError } = await supabaseClient
				.from('trip_players')
				.delete()
				.eq('trip_id', tripId)
				.eq('player_id', playerId);

			if (tripPlayerError) return fail(500, {message: tripPlayerError.message});

			const { error: playerError } = await supabaseClient
				.from('players')
				.delete()
				.eq('id', playerId);

			if (playerError) return fail(500, {message: playerError.message});
		} catch (error) {
			return fail(400, { message: 'failed to parse ids' });
		}
	}
} satisfies Actions;
