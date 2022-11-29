import { error } from '@sveltejs/kit';
import { rounds } from '../../../../data/trips';
import { scorecardsById } from '../../../../data/course';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const round = rounds.find((round) => round.id === params.roundId);
	if (!round) throw error(404, 'Round not found');

	const scorecard = scorecardsById[round.scorecardId];
	if (!scorecard) throw error(404, 'Scorecard not found');

	return {
		round,
		scorecard
	};
};
