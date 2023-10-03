import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { parent, params } = event;
	const { title } = await parent();
	const { getHurdlePointsForRound } = await makeSupabaseAPI(event);

	const roundId = +params.roundId;

	const hurdle = await getHurdlePointsForRound(roundId);

	return {
		title: `${title} | Hurdle`,
		round: (await parent()).rounds.find((round) => round.id === roundId),
		hurdle
	};
}) satisfies PageLoad;
