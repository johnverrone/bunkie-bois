import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { title, rounds } = await parent();
	const round = rounds.find((r) => r.id === parseInt(params.roundId));
	if (!round) throw error(404, 'Round not found');

	return {
		title: `${round.name} | ${title}`,
		round
	};
}) satisfies PageLoad;
