import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';

export function scoresAPI(supabaseClient: TypedSupabaseClient) {
	return {
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
