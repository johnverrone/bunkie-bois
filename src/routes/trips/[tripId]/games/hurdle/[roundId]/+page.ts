import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getHurdlePointsForRound } from '$lib/api';

export const load = (async (event) => {
	const { parent, params, fetch } = event;
	const { title, rounds } = await parent();

	const round = rounds.find((r) => r.id === params.roundId);
	if (!round) error(404, 'Round not found');

	return {
		title: `${title} | ${round?.name} | Hurdle`,
		round,
		hurdle: await getHurdlePointsForRound(round.id, { fetch })
	};
}) satisfies PageLoad;
