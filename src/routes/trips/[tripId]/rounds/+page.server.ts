import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';

export const actions = {
	addRound: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const roundSchema = z.object({
			tripId: z.coerce.number(),
			name: z.string()
		});

		try {
			const { tripId: trip_id, name } = roundSchema.parse(data);
			// const { error: pgError } = await supabaseClient.from('rounds').insert({ trip_id, name });
			// if (pgError) throw error(500, pgError.message);
		} catch (error) {
			return fail(400, { message: `failed to parse round, ${error}` });
		}
	},
	deleteRound: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const deleteSchema = z.object({
			tripId: z.coerce.number(),
			roundId: z.coerce.number()
		});

		try {
			const { tripId, roundId } = deleteSchema.parse(data);
			const { error: pgError } = await supabaseClient
				.from('rounds')
				.delete()
				.eq('trip_id', tripId)
				.eq('id', roundId);

			if (pgError) throw error(500, pgError.message);
		} catch (error) {
			return fail(400, { message: `failed to parse ids, ${error}` });
		}
	}
} satisfies Actions;
