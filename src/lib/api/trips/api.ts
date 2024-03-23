import type { CreateTripRequest, UpdateTripRequest } from './schema';
import { pb } from '$lib/pocketbase';

/**
 * Get all trips
 */
export function getTrips() {
	return pb.collection('trips').getFullList({
		sort: '-created'
	});
}

/**
 * Create a trip
 */
export function createTrip({ name, startDate, endDate }: CreateTripRequest) {
	const data = {
		name,
		startDate: startDate.toISOString().split('T').at(0),
		endDate: endDate.toISOString().split('T').at(0)
	};

	return pb.collection('trips').create(data);
}

/**
 * Delete a trip
 */
export function deleteTrip(id: string) {
	return pb.collection('trips').delete(id);
}

/**
 * Get a trip by ID
 */
export function getTripById(tripId: string) {
	return pb.collection('trips').getOne(tripId);
}

/**
 * Update a trip
 */
export function updateTrip({ id, name, startDate, endDate }: UpdateTripRequest) {
	const data = {
		name,
		startDate,
		endDate
	};

	return pb.collection('trips').update(id, data);
}
