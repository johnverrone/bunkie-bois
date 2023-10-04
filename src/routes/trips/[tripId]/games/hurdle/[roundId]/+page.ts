import { makeSupabaseAPI } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { parent, params } = event;
	const { title, rounds } = await parent();
	const { getHurdlePointsForRound } = await makeSupabaseAPI(event);

	const roundId = +params.roundId;
	const round = rounds.find((r) => r.id === roundId);

	const hurdle = await getHurdlePointsForRound(roundId);

	return {
		title: `${title} | ${round?.name} | Hurdle`,
		round,
		hurdle
	};
}) satisfies PageLoad;
