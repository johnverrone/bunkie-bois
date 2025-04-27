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
	// use custom endpoint for transaction
	const f = opts?.fetch ?? fetch;
	const resp = await f(`${pb.baseUrl}/api/bb/createScorecard`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(req)
	});
	return await resp.json();
}

/**
 * Delete a score
 */
export function deleteScorecard(id: string, opts?: SendOptions) {
	return pb.collection('scorecards').delete(id, opts);
}
