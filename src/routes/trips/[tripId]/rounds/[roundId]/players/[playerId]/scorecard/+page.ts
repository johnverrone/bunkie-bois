import type { PageLoad } from './$types';
import { getScorecard } from '$lib/api';

export const load = (async (event) => {
	const { parent, fetch } = event;
	const { round, player } = await parent();

	const scorecard = await getScorecard({ playerId: player.id, roundId: round.id }, { fetch });

	return {
		scorecard
	};
}) satisfies PageLoad;
