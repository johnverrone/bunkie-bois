import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getSkinsForRound } from '$lib/api';

export const load = (async (event) => {
	const { params, parent } = event;
	const { title, rounds } = await parent();

	const round = rounds.find((round) => round.id === params.roundId);
	if (!round) throw error(404, 'Round not found');

	return {
		title: `${title} | ${round?.name} | Skins`,
		round,
		skins: await getSkinsForRound(round.id)
	};
}) satisfies PageLoad;
