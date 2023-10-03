import { fail } from '@sveltejs/kit';
import { makeSupabaseAPI, schemas } from '@api';
import type { Actions } from './$types';

export const actions = {
	deleteTrip: async (event) => {
		const { request } = event;
		const { deleteTrip } = await makeSupabaseAPI(event);

		const data = Object.fromEntries(await request.formData());
		const parseResult = schemas.deleteTripSchema.safeParse(data);
		if (!parseResult.success) return fail(400, { message: 'Invalid trip ID.' });

		const response = await deleteTrip(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error deleting trip.' });
	}
} satisfies Actions;
