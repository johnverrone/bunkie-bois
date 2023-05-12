import { error, fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';
import { makeSupabaseAPI } from '@api';

export const actions = {
	addRound: async (event) => {
		const { request } = event;
		const { session, createRound } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const roundSchema = z.object({
			tripId: z.coerce.number(),
			courseId: z.coerce.number(),
			name: z.string(),
			date: z.coerce.date()
		});

		try {
			const { tripId, courseId, name, date } = roundSchema.parse(data);
			return createRound(tripId, { courseId, name, date });
		} catch (error) {
			return fail(400, { message: `failed to parse round, ${error}` });
		}
	},
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
			return deleteRound(roundId);
		} catch (error) {
			return fail(400, { message: `failed to parse id, ${error}` });
		}
	}
} satisfies Actions;
