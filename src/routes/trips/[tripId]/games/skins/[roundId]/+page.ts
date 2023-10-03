import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { params, parent } = event;
	const { title, rounds } = await parent();
	const { getSkinsForRound } = await makeSupabaseAPI(event);

	const roundId = +params.roundId;

	const skins = (await getSkinsForRound(roundId)) ?? new Map<string, string[]>();

	return {
		title: `${title} | Skins`,
		round: rounds.find((round) => round.id === roundId),
		skins
	};
}) satisfies PageLoad;
