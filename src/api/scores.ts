import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';

export function scoresAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Log score for a player
		 */
		logScore: async function ({
			playerId,
			roundId,
			teeBoxId,
			courseHandicap,
			scores
		}: {
			playerId: number;
			roundId: number;
			teeBoxId: number;
			courseHandicap: number;
			scores: { [key: number]: number };
		}) {
			// create scorecard entry
			const { data, error: scorecardError } = await supabaseClient
				.from('scorecards')
				.insert({
					player_id: playerId,
					round_id: roundId,
					tee_box_id: teeBoxId,
					player_handicap: courseHandicap
				})
				.select('id')
				.single();

			if (scorecardError) {
				return {
					ok: false as const,
					error: scorecardError.message
				};
			}
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

			if (holeScoresError) {
				return {
					ok: false as const,
					error: holeScoresError.message
				};
			}

			return {
				ok: true
			};
		},

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
		 * Delete a scorecard
		 */
		deleteScore: async function (scorecardId?: number) {
			// delete hole_scores
			const { error: holeScoresError } = await supabaseClient
				.from('hole_scores')
				.delete()
				.eq('scorecard_id', scorecardId);

			if (holeScoresError) {
				return {
					ok: false as const,
					error: holeScoresError.message
				};
			}

			// delete scorecard
			const { error: scorecardError } = await supabaseClient
				.from('scorecards')
				.delete()
				.eq('id', scorecardId);

			if (scorecardError) {
				return {
					ok: false as const,
					error: scorecardError.message
				};
			}

			return {
				ok: true as const,
				error: null
			};
		}
	};
}
