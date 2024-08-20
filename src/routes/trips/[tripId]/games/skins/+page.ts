import { getSkinsForRound } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
	const { title, rounds } = await parent();

	const cummulativeSkins = new Map<string, number>();
	for (const round of rounds) {
		const skins = await getSkinsForRound(round.id, { fetch });
		if (!skins) continue;
		for (const [player, s] of skins) {
			cummulativeSkins.set(player, (cummulativeSkins.get(player) ?? 0) + s.length);
		}
	}

	return {
		title: title ? `${title} | Skins` : 'Skins',
		cummulativeSkins
	};
}) satisfies PageLoad;
