import { Result } from '$lib/api/types';
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { CreateTripRequest, DeleteTripRequest, UpdateTripRequest } from './schema';
import { pb } from '$lib/pocketbase';

/**
 * Get all trips
 */
export async function getTrips() {
	try {
		const records = await pb.collection('trips').getFullList({
			sort: '-created'
		});
		return Result.ok(records);
	} catch (err) {
		return Result.error(err as string);
	}
}

/**
 * Create a trip
 */
export async function createTrip({ name, startDate, endDate }: CreateTripRequest) {
	try {
		const data = {
			name,
			startDate: startDate.toISOString().split('T').at(0),
			endDate: endDate.toISOString().split('T').at(0)
		};

		const record = await pb.collection('trips').create(data);
		return Result.ok(record);
	} catch (err) {
		// TODO handle different types of errors (eg permissions, bad request, etc.)
		return Result.error(err as string);
	}
}

/**
 * Delete a trip
 */
export async function deleteTrip(id: string) {
	try {
		await pb.collection('trips').delete(id);
		return Result.ok(true);
	} catch (err) {
		return Result.error(err as string);
	}
}

// LEGACY

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
