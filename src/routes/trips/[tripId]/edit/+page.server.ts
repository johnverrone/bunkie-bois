import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const actions = {
	updateTrip: async (event) => {
		const { request } = event;
		const { session, supabaseClient } = await getSupabase(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const tripSchema = z.object({
			id: z.coerce.number(),
			name: z.string(),
			startDate: z.coerce.date(),
      endDate: z.coerce.date(),
		});

		try {
			const { id, name, startDate, endDate } = tripSchema.parse(data);

			const { error: pgError } = await supabaseClient
				.from('trips')
				.update({ name, start_date: startDate.toISOString(), end_date: endDate.toISOString() })
				.eq('id', id);

			if (pgError) return fail(500, { message: pgError.message });
		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
} satisfies Actions;
