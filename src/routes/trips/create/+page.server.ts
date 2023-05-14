import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI } from '@api';
import { z } from 'zod';

export const actions = {
	createTrip: async (event) => {
		const { request } = event;
		const { session, createTrip } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const tripSchema = z.object({
			name: z.string(),
			startDate: z.coerce.date(),
			endDate: z.coerce.date()
		});

		let trip: z.infer<typeof tripSchema>;
		try {
			trip = tripSchema.parse(data);
		} catch (error) {
			return fail(400, { message: 'invalid round config' });
		}

		const result = await createTrip(trip);
		if (!result.ok) {
			return fail(500, { message: result.error });
		}
		throw redirect(303, `/trips/${result.id}/rounds`);
	}
} satisfies Actions;
