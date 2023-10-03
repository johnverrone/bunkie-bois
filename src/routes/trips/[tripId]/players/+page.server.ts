import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { makeSupabaseAPI, playersSchemas } from '@api';

export const actions = {
	addPlayer: async (event) => {
		const { request } = event;
		const { createPlayer, addPlayerToTrip } = await makeSupabaseAPI(event);

		const requestData = Object.fromEntries(await request.formData());
		const parseResult = playersSchemas.createPlayerSchema.safeParse(requestData);
		if (!parseResult.success) return fail(400, { message: 'Invalid player information.' });

		const response = await createPlayer(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error creating the player.' });

		const addToTripResponse = await addPlayerToTrip(response.data.id, parseResult.data.tripId);
		if (!addToTripResponse.ok)
			return fail(500, { message: 'There was an error adding player to this trip.' });
	},
	updatePlayer: async (event) => {
		const { request } = event;
		const { updatePlayer } = await makeSupabaseAPI(event);

		const requestData = Object.fromEntries(await request.formData());
		const parseResult = playersSchemas.updatePlayerSchema.safeParse(requestData);
		if (!parseResult.success) return fail(400, { message: 'Invalid player information.' });

		const response = await updatePlayer(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error updating player.' });
	},
	deletePlayer: async (event) => {
		const { request } = event;
		const { deletePlayer } = await makeSupabaseAPI(event);

		const requestData = Object.fromEntries(await request.formData());
		const parseResult = playersSchemas.deletePlayerSchema.safeParse(requestData);
		if (!parseResult.success) return fail(400, { message: 'Invalid request.' });

		const response = await deletePlayer(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error deleting player.' });
	}
} satisfies Actions;
