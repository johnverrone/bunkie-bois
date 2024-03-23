import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getCourseDetails, getScorecard } from '$lib/api';

export const load = (async (event) => {
	const { params, parent } = event;
	const { rounds, tripPlayers } = await parent();

	const player = tripPlayers.find((p) => p.id === params.playerId);
	if (!player) throw error(404, 'Player not found');

	const round = rounds.find((r) => r.id === params.roundId);
	if (!round) throw error(500, 'Unable to load round information');

	const playerId = params.playerId;
	const roundId = params.roundId;
	const courseId = round.expand?.course?.id;
	if (!courseId) throw error(500, 'Unable to get course information');

	const scorecard = await getScorecard({ playerId, roundId });
	const courseData = await getCourseDetails(courseId);

	return {
		title: `${player.name} Scorecard`,
		round,
		player,
		scorecard,
		courseData
	};
}) satisfies PageLoad;
