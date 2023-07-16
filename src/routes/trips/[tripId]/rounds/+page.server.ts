import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';
import { makeSupabaseAPI } from '@api';

export const actions = {
	deleteRound: async (event) => {
		const { request } = event;
		const { session, deleteRound } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const deleteSchema = z.object({
			roundId: z.coerce.number()
		});

		try {
			const { roundId } = deleteSchema.parse(data);
			const response = await deleteRound(roundId);
			if (!response.success) return fail(500, { message: response.error });
		} catch (error) {
			return fail(400, { message: `failed to parse id, ${error}` });
		}
	}
} satisfies Actions;
