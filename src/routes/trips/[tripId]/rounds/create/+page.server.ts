import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI, roundsSchemas } from '$lib/api';

export const actions = {
	createRound: async (event) => {
		const { request } = event;
		const { createRound } = await makeSupabaseAPI(event);

		const data = Object.fromEntries(await request.formData());
		const parseResult = roundsSchemas.createRoundSchema.safeParse(data);
		if (!parseResult.success) return fail(400, { message: 'Invalid round information.' });

		const response = await createRound(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error creating round.' });

		throw redirect(303, `/trips/${event.params.tripId}/rounds`);
	}
} satisfies Actions;
