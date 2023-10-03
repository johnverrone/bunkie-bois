import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI, schemas } from '@api';

export const actions = {
	updateTrip: async (event) => {
		const { request } = event;
		const { updateTrip } = await makeSupabaseAPI(event);

		const data = Object.fromEntries(await request.formData());
		const parseResult = schemas.updateTripSchema.safeParse(data);
		if (!parseResult.success) return fail(400, { message: 'Invalid trip information.' });

		const response = await updateTrip(parseResult.data);
		if (!response.ok) return fail(500, { message: 'Failed to update trip,' });
		throw redirect(303, `/trips/${parseResult.data.id}/rounds`);
	}
} satisfies Actions;
