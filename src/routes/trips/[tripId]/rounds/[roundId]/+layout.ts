import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { getLeaderboard } from '$lib/api';

export const load = (async (event) => {
	const { params, parent } = event;
	const { title, rounds } = await parent();
	const round = rounds.find((r) => r.id === params.roundId);
	if (!round) error(404, 'Round not found');

	return {
		title: `${round.name} | ${title}`,
		round,
		leaderboard: await getLeaderboard(round.id)
	};
}) satisfies LayoutLoad;
