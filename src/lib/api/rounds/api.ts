import type { CreateRoundRequest, UpdateRoundRequest } from './schema';
import { pb } from '$lib/pocketbase';
import type { SendOptions } from 'pocketbase';

/**
 * Get all rounds for a trip
 */
export function getRounds(tripId?: string, opts?: SendOptions) {
	return pb.collection('rounds').getFullList({
		expand: 'course',
		filter: `trip?~'${tripId}'`,
		...opts
	});
}

/**
 * Create new round for a trip
 */
export function createRound(
	{ tripId, courseId, name, date }: CreateRoundRequest,
	opts?: SendOptions
) {
	const data = {
		trip: tripId,
		course: courseId,
		name,
		date: date.toISOString().split('T').at(0)
	};

	return pb.collection('rounds').create(data, opts);
}

/**
 * Delete a round
 */
export function deleteRound(id: string, opts?: SendOptions) {
	return pb.collection('rounds').delete(id, opts);
}

/**
 * Update a round
 */
export function updateRound({ id, courseId, name, date }: UpdateRoundRequest, opts?: SendOptions) {
	const data = {
		course: courseId,
		name,
		date: date.toISOString().split('T').at(0)
	};

	return pb.collection('rounds').update(id, data, opts);
}
