import type { UpdateScorecardRequest } from './schema';
import { pb } from '$lib/pocketbase';

/**
 * Get scorecard for a player's round
 */
export function getScorecard({ playerId, roundId }: { playerId: string; roundId: string }) {
	return pb
		.collection('scorecards')
		.getFirstListItem(`player='${playerId}' && round='${roundId}'`, {
			expand: 'teeBox,holeScores_via_scorecard'
		});
}

/**
 * Get leaderboard for round
 */
export function getLeaderboard(id: string) {
	return pb.collection('scorecards').getFullList({
		expand: 'player,teeBox,holeScores_via_scorecard',
		filter: `round='${id}'`
	});
}

/**
 * Log score for a player
 */
export async function logScore(req: UpdateScorecardRequest) {
	// create scorecard entry
	const data = {
		player: req.playerId,
		round: req.roundId,
		teeBox: req.teeBoxId
	};
	const scorecard = await pb.collection('scorecards').create(data);

	// add scores to hole_scores
	const scoresToInsert = Object.entries(req.scores).map(([holeNumber, score]) => ({
		scorecard: scorecard.id,
		holeNumber,
		score
	}));

	console.log({ scoresToInsert });

	scoresToInsert.map((s) => pb.collection('holeScores').create(s, { requestKey: null }));
}
