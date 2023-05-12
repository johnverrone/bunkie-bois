import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error, fail } from '@sveltejs/kit';

export function tripsAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Get all trips
		 */
		getTrips: async function () {
			const { data, error: dbError } = await supabaseClient.from('trips').select();

			if (dbError) {
				throw error(500, {
					message: dbError.message
				});
			}

			return data;
		},

		/**
		 * Get a single trip by ID
		 */
		getTripById: async function (tripId: string) {
			const { data, error: dbError } = await supabaseClient
				.from('trips')
				.select()
				.eq('id', tripId)
				.limit(1)
				.single();

			if (dbError) {
				throw error(500, {
					message: dbError.message
				});
			}

			return data;
		},

		/**
		 * Create a trip
		 */
		createTrip: async function (name: string) {
			const { error: dbError } = await supabaseClient.from('trips').insert({ name });

			if (dbError) {
				return fail(500, {
					message: dbError.message
				});
			}
		},

		/**
		 * Update a trip's name, startDate, or endDate
		 */
		updateTrip: async function ({
			id,
			name,
			startDate,
			endDate
		}: {
			id: number;
			name?: string;
			startDate?: Date;
			endDate?: Date;
		}) {
			const { error: dbError } = await supabaseClient
				.from('trips')
				.update({ name, start_date: startDate?.toISOString(), end_date: endDate?.toISOString() })
				.eq('id', id);

			if (dbError) return fail(500, { message: dbError.message });
		},

		/**
		 * Delete a trip by ID
		 */
		deleteTrip: async function (id: string) {
			const { error: dbError } = await supabaseClient.from('trips').delete().eq('id', id);
			if (dbError) return fail(500, { message: dbError.message });
		}
	};
}
