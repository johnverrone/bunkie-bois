import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	const { parent } = event;
	const { title, trip, tripPlayers } = await parent();
	const { session, getTotalScoreForTrip } = await makeSupabaseAPI(event);
	if (!session) throw redirect(303, '/');

	const leaderboard = await Promise.all(
		tripPlayers.map(async (p) => {
			const playerScore = await getTotalScoreForTrip(p.id, trip.id);
			return { player: p.name, score: playerScore };
		})
	);

	return {
		title: `${title} | Leaderboard`,
		leaderboard
	};
}) satisfies PageLoad;
