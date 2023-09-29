import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { makeSupabaseAPI } from '@api';

export const actions = {
	updateRound: async (event) => {
		const { request } = event;
		const { session, updateRound } = await makeSupabaseAPI(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const roundSchema = z.object({
			id: z.coerce.number(),
			name: z.string(),
			courseId: z.coerce.number(),
			date: z.coerce.date()
		});

		let round: z.infer<typeof roundSchema>;
		try {
			round = roundSchema.parse(data);
		} catch (error) {
			return fail(400, { message: `failed to parse round, ${error}` });
		}

		const result = await updateRound(round);
		if (!result.success) {
			return fail(500, { message: result.error });
		}
		throw redirect(303, `/trips/${event.params.tripId}/rounds`);
	}
} satisfies Actions;
