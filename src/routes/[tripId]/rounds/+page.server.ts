import { supabase } from '$lib/server/supabaseClient';
import { error, invalid } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { title } = await parent();
	return {
		title: `${title} | Rounds`
	};
};

export const actions: Actions = {
	addRound: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const roundSchema = z.object({
			tripId: z.preprocess((id) => parseInt(z.string().parse(id)), z.number()),
			name: z.string()
		});

		try {
			const { tripId: trip_id, name } = roundSchema.parse(data);
			const { error: pgError } = await supabase.from('rounds').insert({ trip_id, name });
			if (pgError) throw error(500, pgError.message);
		} catch (error) {
			return invalid(400, { message: `failed to parse round, ${error}` });
		}
	}
};
