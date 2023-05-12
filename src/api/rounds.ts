import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error, fail } from '@sveltejs/kit';

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
		}
	};
}
