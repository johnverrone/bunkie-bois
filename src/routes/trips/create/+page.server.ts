import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI } from '$lib/api';
import { tripsSchemas } from '$lib/api/trips';

export const actions = {
	createTrip: async (event) => {
		const { request } = event;
		const { createTrip } = await makeSupabaseAPI(event);

		const requestData = Object.fromEntries(await request.formData());
		const parseResult = tripsSchemas.createTripSchema.safeParse(requestData);
		if (!parseResult.success) return fail(400, { message: 'Invalid trip information.' });

		const response = await createTrip(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error creating trip.' });
		throw redirect(303, `/trips/${response.data.id}/rounds`);
	}
} satisfies Actions;
