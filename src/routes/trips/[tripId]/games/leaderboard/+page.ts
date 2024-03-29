import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getTripLeaderboard } from '$lib/api';

export const load = (async (event) => {
	const { url, parent, fetch } = event;
	const { title, trip, rounds } = await parent();

	if (url.searchParams.get('rounds') === null)
		redirect(307, `?rounds=${rounds.map((r) => r.id).join(',')}`);

	const leaderboardRounds = url.searchParams
		.get('rounds')
		?.split(',')
		.filter((s) => s.length);

	return {
		title: `${title} | Leaderboard`,
		leaderboardRounds,
		leaderboard: await getTripLeaderboard(trip.id, leaderboardRounds, { fetch })
	};
}) satisfies PageLoad;
