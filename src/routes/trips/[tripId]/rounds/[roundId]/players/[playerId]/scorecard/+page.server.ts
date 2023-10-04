import { makeSupabaseAPI, scoresSchemas } from '$lib/api';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	deleteScore: async (event) => {
		const { request } = event;
		const { deleteScore } = await makeSupabaseAPI(event);

		const data = Object.fromEntries(await request.formData());
		const parseResult = scoresSchemas.deleteScoreSchema.safeParse(data);
		if (!parseResult.success) return fail(400, { message: 'Invalid scorecard ID.' });

		const response = await deleteScore(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error deleting scorecard.' });

		throw redirect(303, `/trips/${event.params.tripId}/rounds/${event.params.roundId}`);
	}
} satisfies Actions;
