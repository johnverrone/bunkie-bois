import { getLeagueById } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load = (async ({ depends, params, fetch }) => {
	const { leagueId } = params;
	depends(`league:${leagueId}`);

	const league = await getLeagueById(leagueId, { fetch });

	return {
		title: league.name,
		league
	};
}) satisfies LayoutLoad;
