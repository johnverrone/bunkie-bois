import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error, fail } from '@sveltejs/kit';
import type { Prettify, ArrayElement } from '../utils/typeHelpers';

type Leaderboard = {
	id: string;
	name: string;
	score: number;
	courseHandicap: number;
};

export function roundsAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Get all rounds for a trip
		 */
		getRounds: async function (tripId?: string) {
			const { data: roundsData, error: roundsError } = await supabaseClient
				.from('rounds')
				.select(
					`
						id,
						trip_id,
						course_id,
						name,
						date
					`
				)
				.eq('trip_id', tripId);

			if (roundsError) {
				throw error(500, {
					message: roundsError.message
				});
			}

			const rounds = roundsData.map(({ date, ...round }) => {
				return {
					...round,
					date: date ? new Date(date) : null
				};
			});

			return rounds;
		},

		/**
		 * Create new round on trip
		 */
		createRound: async function (
			tripId: number,
			{ courseId, name, date }: { courseId: number; name: string; date: Date }
		) {
			const { error: dbError } = await supabaseClient.from('rounds').insert({
				trip_id: tripId,
				course_id: courseId,
				name,
				date: date.toISOString()
			});

			if (dbError) return { error: dbError.message };
			return { success: true };
		},

		/**
		 * Delete a round by ID
		 */
		deleteRound: async function (id: number) {
			const { error: dbError } = await supabaseClient.from('rounds').delete().eq('id', id);
			if (dbError) return fail(500, { message: dbError.message });
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
						player_handicap
					),
					hole_number,
					score
				`
				)
				.eq('scorecard.round_id', id);

			if (dbError) {
				throw error(500, {
					message: dbError.message
				});
			}

			type ResultRow = (typeof data)[number];
			type PatchedPlayer = Prettify<ArrayElement<ArrayElement<ResultRow['scorecard']>['player']>>;
			type PatchedScorecard = Prettify<
				Omit<ArrayElement<ResultRow['scorecard']>, 'player'> & { player: PatchedPlayer }
			>;
			type PatchedResult = Prettify<
				Omit<ResultRow, 'scorecard'> & { scorecard: PatchedScorecard | null }
			>;

			const patchedData = data as PatchedResult[];

			const scorecardByPlayer = patchedData.reduce((acc, curr) => {
				if (curr.scorecard === null) return acc;
				const id = curr.scorecard.player.id;
				const name = curr.scorecard.player.name;
				const courseHandicap = curr.scorecard.player_handicap;

				return {
					...acc,
					[id]: {
						...acc[id],
						id,
						name,
						courseHandicap,
						score: (acc[id]?.score ?? 0) + (curr.score ?? 0)
					}
				};
			}, {} as { [key: string]: Leaderboard });

			return Object.values(scorecardByPlayer);
		}
	};
}
