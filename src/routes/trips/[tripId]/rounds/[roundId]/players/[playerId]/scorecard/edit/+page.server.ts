import { makeSupabaseAPI, scoresSchemas } from '@api';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	logScore: async (event) => {
		const { request, params } = event;
		const { logScore } = await makeSupabaseAPI(event);

		const data = Object.fromEntries(await request.formData());
		const parseResult = scoresSchemas.updateScorecardSchema.safeParse(data);
		if (!parseResult.success) return fail(400, { message: 'Invalid scorecard config.' });

		const result = await logScore(parseResult.data);
		if (!result.ok) return fail(500, { message: 'There was an error logging score.' });

		throw redirect(303, `/trips/${params.tripId}/rounds/${params.roundId}`);
	}
} satisfies Actions;
