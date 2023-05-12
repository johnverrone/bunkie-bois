import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { makeSupabaseAPI } from '@api';

export const actions = {
	updateTrip: async (event) => {
		const { request } = event;
		const { session, updateTrip } = await makeSupabaseAPI(event);
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
			return updateTrip({ id, name, startDate, endDate });
		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
} satisfies Actions;
