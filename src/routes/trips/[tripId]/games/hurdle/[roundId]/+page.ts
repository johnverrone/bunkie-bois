import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	const { parent, params } = event;
	const { title } = await parent();
	const { session, getHurdlePointsForRound } = await makeSupabaseAPI(event);
	if (!session) throw redirect(303, '/');

	const roundId = parseInt(params.roundId, 10);

	const hurdle = await getHurdlePointsForRound(roundId);

	return {
		title: `${title} | Hurdle`,
		round: (await parent()).rounds.find((round) => round.id === roundId),
		hurdle
	};
}) satisfies PageLoad;
