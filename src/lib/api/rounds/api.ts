import type { CreateRoundRequest, UpdateRoundRequest } from './schema';
import { pb } from '$lib/pocketbase';

/**
 * Get all rounds for a trip
 */
export function getRounds(tripId?: string) {
	return pb.collection('rounds').getFullList({
		expand: 'course',
		filter: `trip?~'${tripId}'`
	});
}

/**
 * Create new round for a trip
 */
export function createRound({ tripId, courseId, name, date }: CreateRoundRequest) {
	const data = {
		trip: tripId,
		course: courseId,
		name,
		date: date.toISOString().split('T').at(0)
	};

	return pb.collection('rounds').create(data);
}

/**
 * Delete a round
 */
export function deleteRound(id: string) {
	return pb.collection('rounds').delete(id);
}

/**
 * Update a round
 */
export function updateRound({ id, courseId, name, date }: UpdateRoundRequest) {
	const data = {
		course: courseId,
		name,
		date: date.toISOString().split('T').at(0)
	};

	return pb.collection('rounds').update(id, data);
}
