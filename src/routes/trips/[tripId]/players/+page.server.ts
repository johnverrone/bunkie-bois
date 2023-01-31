import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = (async ({ parent }) => {
	const { title } = await parent();
	return {
		title: `${title} | Players`
	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	addPlayer: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			tripId: z.coerce.number(),
			name: z.string(),
			handicap: z.coerce.number()
		});

		try {
			const { tripId: trip_id, name, handicap } = playerSchema.parse(data);

			const { error: pgError } = await supabaseClient
				.from('trip_players')
				.insert({ trip_id, name, handicap });

			if (pgError) return error(500, pgError.message);
		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
	updatePlayer: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			tripId: z.coerce.number(),
			playerId: z.coerce.number(),
			name: z.string(),
			handicap: z.coerce.number()
		});

		try {
			const { tripId, playerId, name, handicap } = playerSchema.parse(data);

			const { error: pgError } = await supabaseClient
				.from('trip_players')
				.update({ name, handicap })
				.eq('trip_id', tripId)
				.eq('player_id', playerId);

			if (pgError) return error(500, pgError.message);
		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
	deletePlayer: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const deleteSchema = z.object({
			tripId: z.coerce.number(),
			playerId: z.coerce.number()
		});

		try {
			const { tripId, playerId } = deleteSchema.parse(data);

			const { error: pgError } = await supabaseClient
				.from('trip_players')
				.delete()
				.eq('trip_id', tripId)
				.eq('player_id', playerId);

			if (pgError) return error(500, pgError.message);
		} catch (error) {
			return fail(400, { message: 'failed to parse ids' });
		}
	}
};
