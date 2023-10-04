import { makeSupabaseAPI } from '@api';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { params, parent } = event;
	const { title, rounds } = await parent();
	const round = rounds.find((r) => r.id === parseInt(params.roundId));
	if (!round) throw error(404, 'Round not found');

	const { getLeaderboard } = await makeSupabaseAPI(event);

	const leaderboard = await getLeaderboard(round.id);

	return {
		title: `${round.name} | ${title}`,
		round,
		leaderboard
	};
}) satisfies LayoutLoad;
