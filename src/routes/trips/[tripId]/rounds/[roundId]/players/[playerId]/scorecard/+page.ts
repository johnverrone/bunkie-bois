import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getCourseDetails, getScorecard } from '$lib/api';

export const load = (async (event) => {
	const { params, parent } = event;
	const { round, tripPlayers } = await parent();

	const player = tripPlayers.find((p) => p.id === params.playerId);
	if (!player) throw error(404, 'Player not found');

	const playerId = params.playerId;
	const courseId = round.expand?.course?.id;
	if (!courseId) throw error(500, 'Unable to get course information');

	const scorecard = await getScorecard({ playerId, roundId: round.id });
	const courseData = await getCourseDetails(courseId);

	return {
		title: `${player.name} Scorecard`,
		player,
		scorecard,
		courseData
	};
}) satisfies PageLoad;
