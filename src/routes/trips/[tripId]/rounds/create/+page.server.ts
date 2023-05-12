import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI } from '@api';
import { z } from 'zod';

export const actions = {
	createRound: async (event) => {
		const { request } = event;
		const { session, createRound } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const roundSchema = z.object({
			tripId: z.coerce.number(),
			courseId: z.coerce.number(),
			name: z.string(),
			date: z.coerce.date()
		});

		try {
			const { tripId, courseId, name, date } = roundSchema.parse(data);
			const result = await createRound(tripId, { courseId, name, date });
			if (result.error) {
				return fail(500, { message: result.error });
			}
		} catch (error) {
			return fail(400, { message: 'invalid round config' });
		}
		throw redirect(303, `/trips/${event.params.tripId}/rounds`);
	}
} satisfies Actions;
