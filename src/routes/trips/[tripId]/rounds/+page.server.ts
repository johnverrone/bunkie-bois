import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI, roundsSchemas } from '$lib/api';

export const actions = {
	deleteRound: async (event) => {
		const { request } = event;
		const { deleteRound } = await makeSupabaseAPI(event);

		const data = Object.fromEntries(await request.formData());
		const parseResult = roundsSchemas.deleteRoundSchema.safeParse(data);
		if (!parseResult.success) return fail(400, { message: 'Invalid round information.' });

		const response = await deleteRound(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error deleting round.' });
	}
} satisfies Actions;
