import { makeSupabaseAPI } from '@api';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';

export const actions = {
	deleteScore: async (event) => {
		const { request } = event;
		const { session, deleteScore } = await makeSupabaseAPI(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const scorecardSchema = z.object({
			id: z.coerce.number()
		});

		let scorecardId: z.infer<typeof scorecardSchema>['id'];
		try {
			scorecardId = scorecardSchema.parse(data).id;
		} catch (error) {
			return fail(400, { message: `failed to parse scorecard, ${error}` });
		}

		const result = await deleteScore(scorecardId);
		if (!result.ok) {
			return fail(500, { message: result.error });
		}
		throw redirect(303, `/trips/${event.params.tripId}/rounds/${event.params.roundId}`);
	}
} satisfies Actions;
