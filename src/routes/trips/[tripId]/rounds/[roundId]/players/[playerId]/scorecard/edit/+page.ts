import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getCourseDetails } from '$lib/api';

export const load = (async (event) => {
	const { params, parent } = event;
	const { rounds, tripPlayers } = await parent();

	const player = tripPlayers.find((p) => p.id === params.playerId);
	if (!player) throw error(404, 'Player not found.');

	const round = rounds.find((r) => r.id === params.roundId);
	if (!round) throw error(500, 'Unable to load round information.');

	const courseId = round.expand?.course?.id;
	if (!courseId) throw error(500, 'Unable to get course information.');

	const courseData = await getCourseDetails(courseId);

	return {
		title: `${player.name} Scorecard`,
		player,
		round,
		courseData
	};
}) satisfies PageLoad;
