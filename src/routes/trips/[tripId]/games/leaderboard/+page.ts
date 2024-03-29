import { makeSupabaseAPI } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { url, parent } = event;
	const { title, trip, tripPlayers, rounds } = await parent();
	const { getTotalScoreForTrip } = await makeSupabaseAPI(event);

	if (url.searchParams.get('rounds') === null)
		throw redirect(307, `?rounds=${rounds.map((r) => r.id).join(',')}`);

	const leaderboardRounds = url.searchParams
		.get('rounds')
		?.split(',')
		.filter((s) => s.length)
		.map((r) => +r);

	const leaderboard = await Promise.all(
		tripPlayers.map(async (p) => {
			const playerScore = await getTotalScoreForTrip(p.id, trip.id, leaderboardRounds);
			return { player: p.name, score: playerScore };
		})
	);

	return {
		title: `${title} | Leaderboard`,
		leaderboard,
		leaderboardRounds
	};
}) satisfies PageLoad;
