import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getTotalScoreForTrip } from '$lib/api';

export const load = (async (event) => {
	const { url, parent, fetch } = event;
	const { title, trip, tripPlayers, rounds } = await parent();

	if (url.searchParams.get('rounds') === null)
		redirect(307, `?rounds=${rounds.map((r) => r.id).join(',')}`);

	const leaderboardRounds = url.searchParams
		.get('rounds')
		?.split(',')
		.filter((s) => s.length);

	const leaderboard = await Promise.all(
		tripPlayers.map(async (p) => {
			const playerScore = await getTotalScoreForTrip(p.id, trip.id, leaderboardRounds, { fetch });
			return { player: p.name, score: playerScore };
		})
	);

	return {
		title: `${title} | Leaderboard`,
		leaderboard,
		leaderboardRounds
	};
}) satisfies PageLoad;
