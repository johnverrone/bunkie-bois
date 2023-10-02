import { makeSupabaseAPI } from '@api';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { params, parent } = event;
	const { title, rounds } = await parent();
	const { session, getSkinsForRound } = await makeSupabaseAPI(event);
	if (!session) throw redirect(303, '/');

	const roundId = parseInt(params.roundId, 10);

	const skins = (await getSkinsForRound(roundId)) ?? new Map<string, string[]>();

	return {
		title: `${title} | Skins`,
		round: rounds.find((round) => round.id === roundId),
		skins
	};
}) satisfies PageLoad;
