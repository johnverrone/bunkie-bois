import { makeSupabaseAPI } from '@api';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { params, parent } = event;
	const { title } = await parent();
	const { session } = await makeSupabaseAPI(event);
	if (!session) throw redirect(303, '/');

	const roundId = parseInt(params.roundId, 10);

	return {
		title: `${title} | Skins`,
		round: (await parent()).rounds.find((round) => round.id === roundId),
		skins: {
			John: ['1', '5', '18'],
			Alex: ['2', '8', '13', '15', '17']
		}
	};
}) satisfies PageLoad;
