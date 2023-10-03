import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { makeSupabaseAPI } from '@api';

export const load = (async (event) => {
	const { params, parent } = event;
	const { rounds, tripPlayers } = await parent();
	const { getCourseDetails } = await makeSupabaseAPI(event);

	const player = tripPlayers.find((p) => p.id === parseInt(params.playerId));
	if (!player) throw error(404, 'Player not found.');

	const round = rounds.find((r) => r.id === parseInt(params.roundId));
	if (!round) throw error(500, 'Unable to load round information.');

	const courseData = await getCourseDetails(round.course.id);

	return {
		title: `${player.name} Scorecard`,
		player,
		round,
		courseData
	};
}) satisfies PageLoad;
