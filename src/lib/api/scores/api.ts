import type { UpdateScorecardRequest } from './schema';
import { pb } from '$lib/pocketbase';
import type { SendOptions } from 'pocketbase';

/**
 * Get scorecard for a player's round
 */
export function getScorecard(
	{ playerId, roundId }: { playerId: string; roundId: string },
	opts?: SendOptions
) {
	return pb
		.collection('scorecards')
		.getFirstListItem(`player='${playerId}' && round='${roundId}'`, {
			expand: 'teeBox,holeScores_via_scorecard',
			...opts
		});
}

/**
 * Get leaderboard for round
 */
export function getLeaderboard(id: string, opts?: SendOptions) {
	return pb.collection('scorecards').getFullList({
		expand: 'player,teeBox,holeScores_via_scorecard',
		filter: `round='${id}'`,
		...opts
	});
}

/**
 * Log score for a player
 */
export async function logScore(req: UpdateScorecardRequest, opts?: SendOptions) {
	// create scorecard entry
	const data = {
		player: req.playerId,
		round: req.roundId,
		teeBox: req.teeBoxId,
		playerHandicap: req.courseHandicap
	};
	const scorecard = await pb.collection('scorecards').create(data, opts);

	// add scores to hole_scores
	const scoresToInsert = Object.entries(req.scores).map(([holeNumber, score]) => ({
		scorecard: scorecard.id,
		holeNumber,
		score
	}));

	// use custom endpoint to bulk insert
	const f = opts?.fetch ?? fetch;
	const resp = await f(`${pb.baseUrl}/api/bb/createHoleScores`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ scores: scoresToInsert })
	});
	return await resp.json();
}

/**
 * Delete a score
 */
export function deleteScorecard(id: string, opts?: SendOptions) {
	return pb.collection('scorecards').delete(id, opts);
}
