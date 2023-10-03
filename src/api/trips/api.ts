import { Result } from '@api/types';
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { CreateTripRequest, DeleteTripRequest, UpdateTripRequest } from './schema';

export function tripsAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Get all trips
		 */
		getTrips: async function () {
			const { data, error: dbError } = await supabaseClient.from('trips').select();

			if (dbError) throw error(500, { message: 'There was an error fetching trips.' });

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

			if (dbError) throw error(500, { message: 'There was an error fetching trip information.' });

			return data;
		},

		/**
		 * Create a trip
		 */
		createTrip: async function ({ name, startDate, endDate }: CreateTripRequest) {
			const { data, error: dbError } = await supabaseClient
				.from('trips')
				.insert({ name, start_date: startDate.toISOString(), end_date: endDate.toISOString() })
				.select('id')
				.single();

			if (dbError) return Result.error(dbError.message);
			return Result.ok(data);
		},

		/**
		 * Update a trip's name, startDate, or endDate
		 */
		updateTrip: async function ({ id, name, startDate, endDate }: UpdateTripRequest) {
			const { error: dbError } = await supabaseClient
				.from('trips')
				.update({ name, start_date: startDate?.toISOString(), end_date: endDate?.toISOString() })
				.eq('id', id);

			if (dbError) return Result.error(dbError.message);
			return Result.ok(true);
		},

		/**
		 * Delete a trip by ID
		 */
		deleteTrip: async function ({ tripId }: DeleteTripRequest) {
			const { error: dbError } = await supabaseClient.from('trips').delete().eq('id', tripId);
			if (dbError) Result.error(dbError.message);
			return Result.ok(true);
		}
	};
}
