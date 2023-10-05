import { Result } from '$lib/api/types';
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { transformScoreData } from './helpers';
import type { DeleteScoreRequest, UpdateScorecardRequest } from './schema';
import type { LeaderboardEntry } from './types';

export function scoresAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Get scorecard for a player's round
		 */
		getScorecard: async function ({ playerId, roundId }: { playerId: number; roundId: number }) {
			const { data: scorecard, error: scorecardError } = await supabaseClient
				.from('scorecards')
				.select('*')
				.eq('player_id', playerId)
				.eq('round_id', roundId)
				.single();

			if (scorecardError || !scorecard) {
				throw error(500, {
					message: scorecardError.message || 'error fetching scorecard'
				});
			}

			const { data, error: dbError } = await supabaseClient
				.from('hole_scores')
				.select('*')
				.eq('scorecard_id', scorecard.id);

			if (dbError) {
				throw error(500, {
					message: dbError.message
				});
			}

			return {
				...scorecard,
				hole_scores: data
			};
		},

		/**
		 * Get leaderboard for round
		 */
		getLeaderboard: async function (id: number) {
			const { data, error: dbError } = await supabaseClient
				.from('hole_scores')
				.select(
					`
							scorecard:scorecards (
								player:players ( id, name ),
								round_id,
								player_handicap,
								tee_box:tee_boxes ( id, name )
							),
							hole_number,
							score
						`
				)
				.eq('scorecard.round_id', id);

			if (dbError) throw error(500, { message: dbError.message });

			const scorecardByPlayer = data.reduce((acc, curr) => {
				if (
					curr.scorecard === null ||
					curr.scorecard.player === null ||
					curr.scorecard.tee_box === null
				)
					return acc;
				const id = curr.scorecard.player.id;
				const name = curr.scorecard.player.name;
				const courseHandicap = curr.scorecard.player_handicap ?? 0;
				const teeBox = curr.scorecard.tee_box.name;

				return {
					...acc,
					[id]: {
						...acc[id],
						id,
						name,
						courseHandicap,
						teeBox,
						score: (acc[id]?.score ?? 0) + (curr.score ?? 0)
					}
				};
			}, {} as { [key: number]: LeaderboardEntry });

			return Object.values(scorecardByPlayer);
		},

		/**
		 * Log score for a player
		 */
		logScore: async function (request: UpdateScorecardRequest) {
			const scores = transformScoreData(request);

			// create scorecard entry
			const { data, error: scorecardError } = await supabaseClient
				.from('scorecards')
				.insert({
					player_id: request.playerId,
					round_id: request.roundId,
					tee_box_id: request.teeBoxId,
					player_handicap: request.courseHandicap
				})
				.select('id')
				.single();

			if (scorecardError) return Result.error(scorecardError.message);
			const scorecardId = data.id;

			// add scores to hole_scores
			const scoresToInsert = Object.entries(scores).map(([holeNumber, score]) => ({
				scorecard_id: scorecardId,
				hole_number: parseInt(holeNumber),
				score
			}));

			const { error: holeScoresError } = await supabaseClient
				.from('hole_scores')
				.insert(scoresToInsert);

			if (holeScoresError) return Result.error(holeScoresError.message);

			return Result.ok(true);
		},

		/**
		 * Delete a scorecard
		 */
		deleteScore: async function ({ id }: DeleteScoreRequest) {
			// delete hole_scores
			const { error: holeScoresError } = await supabaseClient
				.from('hole_scores')
				.delete()
				.eq('scorecard_id', id);

			if (holeScoresError) return Result.error(holeScoresError.message);

			// delete scorecard
			const { error: scorecardError } = await supabaseClient
				.from('scorecards')
				.delete()
				.eq('id', id);

			if (scorecardError) return Result.error(scorecardError.message);

			return Result.ok(true);
		}
	};
}
