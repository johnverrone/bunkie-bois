import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI, roundsSchemas } from '@api';

export const actions = {
	updateRound: async (event) => {
		const { request } = event;
		const { updateRound } = await makeSupabaseAPI(event);

		const data = Object.fromEntries(await request.formData());
		const parseResult = roundsSchemas.updateRoundSchema.safeParse(data);
		if (!parseResult.success) return fail(400, { message: 'Invalid round config.' });

		const result = await updateRound(parseResult.data);
		if (!result.ok) return fail(500, { message: 'There was an error updating round.' });

		throw redirect(303, `/trips/${event.params.tripId}/rounds`);
	}
} satisfies Actions;
