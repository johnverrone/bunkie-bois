import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { makeSupabaseAPI } from '@api';
import type { Actions } from './$types';

export const actions = {
	deleteTrip: async (event) => {
		const { request } = event;
		const { session, deleteTrip } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const deleteSchema = z.object({
			tripId: z.coerce.number()
		});

		try {
			const { tripId } = deleteSchema.parse(data);
			const response = await deleteTrip(tripId);
			if (!response.ok) return fail(500, { message: response.error });
		} catch (error) {
			return fail(400, { message: `failed to parse id, ${error}` });
		}
	}
} satisfies Actions;
