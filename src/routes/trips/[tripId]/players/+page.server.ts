import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import { makeSupabaseAPI } from '@api';

export const actions = {
	addPlayer: async (event) => {
		const { request } = event;
		const { session, createPlayer, addPlayerToTrip } = await makeSupabaseAPI(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			tripId: z.coerce.number(),
			name: z.string(),
			handicap: z.coerce.number()
		});

		try {
			const { tripId, name, handicap } = playerSchema.parse(data);

			const { playerId, error: createPlayerMessage } = await createPlayer({name, handicap});
			if (!playerId) {
				return fail(500, { message: `failed to create player, ${createPlayerMessage}`})
			}

			return addPlayerToTrip(playerId, tripId);

		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
	updatePlayer: async (event) => {
		const { request } = event;
		const { session, updatePlayer } = await makeSupabaseAPI(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const playerSchema = z.object({
			playerId: z.coerce.number(),
			name: z.string(),
			handicap: z.coerce.number()
		});

		try {
			const { playerId, name, handicap } = playerSchema.parse(data);

			return updatePlayer(playerId, { name, handicap });
		} catch (error) {
			return fail(400, { message: `failed to parse player, ${error}` });
		}
	},
	deletePlayer: async (event) => {
		const { request } = event;
		const { session, deletePlayer } = await makeSupabaseAPI(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const deleteSchema = z.object({
			tripId: z.coerce.number(),
			playerId: z.coerce.number()
		});

		try {
			const { tripId, playerId } = deleteSchema.parse(data);

			return deletePlayer(tripId, playerId);
		} catch (error) {
			return fail(400, { message: 'failed to parse ids' });
		}
	}
} satisfies Actions;
