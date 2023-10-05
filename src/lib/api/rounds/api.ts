import { Result } from '$lib/api/types';
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { CreateRoundRequest, DeleteRoundRequest, UpdateRoundRequest } from './schema';

export function roundsAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Get all rounds for a trip
		 */
		getRounds: async function (tripId?: string) {
			let query = supabaseClient.from('rounds').select(
				`
						id,
						trip_id,
						course_id,
						name,
						date
					`
			);

			if (tripId) query = query.eq('trip_id', tripId);

			const { data: roundsData, error: roundsError } = await query;

			if (roundsError) throw error(500, { message: roundsError.message });

			return roundsData;
		},

		/**
		 * Create new round on trip
		 */
		createRound: async function ({ tripId, courseId, name, date }: CreateRoundRequest) {
			const { error: dbError } = await supabaseClient.from('rounds').insert({
				trip_id: tripId,
				course_id: courseId,
				name,
				date: date.toISOString()
			});

			if (dbError) return Result.error(dbError.message);
			return Result.ok(true);
		},

		/**
		 * Update round information
		 */
		updateRound: async function ({ id, courseId, name, date }: UpdateRoundRequest) {
			const { error: dbError } = await supabaseClient
				.from('rounds')
				.update({
					course_id: courseId,
					name,
					date: date.toISOString()
				})
				.eq('id', id);

			if (dbError) return Result.error(dbError.message);
			return Result.ok(true);
		},

		/**
		 * Delete a round by ID
		 */
		deleteRound: async function ({ roundId }: DeleteRoundRequest) {
			const { error: dbError } = await supabaseClient.from('rounds').delete().eq('id', roundId);
			if (dbError) return Result.error(dbError.message);
			return Result.ok(true);
		}
	};
}
