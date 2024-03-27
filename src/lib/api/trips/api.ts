import type { CreateTripRequest, UpdateTripRequest } from './schema';
import { pb } from '$lib/pocketbase';
import type { SendOptions } from 'pocketbase';

/**
 * Get all trips
 */
export function getTrips(opts?: SendOptions) {
	return pb.collection('trips').getFullList({
		sort: '-created',
		...opts
	});
}

/**
 * Create a trip
 */
export function createTrip({ name, startDate, endDate }: CreateTripRequest, opts?: SendOptions) {
	const data = {
		name,
		startDate: startDate.toISOString().split('T').at(0),
		endDate: endDate.toISOString().split('T').at(0)
	};

	return pb.collection('trips').create(data, opts);
}

/**
 * Delete a trip
 */
export function deleteTrip(id: string, opts?: SendOptions) {
	return pb.collection('trips').delete(id, opts);
}

/**
 * Get a trip by ID
 */
export function getTripById(tripId: string, opts?: SendOptions) {
	return pb.collection('trips').getOne(tripId, opts);
}

/**
 * Update a trip
 */
export function updateTrip(
	{ id, name, startDate, endDate }: UpdateTripRequest,
	opts?: SendOptions
) {
	const data = {
		name,
		startDate,
		endDate
	};

	return pb.collection('trips').update(id, data, opts);
}
