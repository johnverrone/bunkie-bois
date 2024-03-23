import type { CreatePlayerRequest, UpdatePlayerRequest } from './schema';
import { pb } from '$lib/pocketbase';

/**
 * Get all players for trip
 */
export function getPlayers(tripId?: string) {
	return pb.collection('players').getFullList({
		filter: tripId ? `trips?~'${tripId}'` : undefined
	});
}

/**
 * Create a player
 */
export function createPlayer({ name, handicap, tripId }: CreatePlayerRequest) {
	const data = {
		name,
		handicap,
		trips: [tripId]
	};

	return pb.collection('players').create(data);
}

/**
 * Update player
 */
export function updatePlayer({ id, name, handicap }: UpdatePlayerRequest) {
	const data = {
		name,
		handicap
	};

	return pb.collection('players').update(id, data);
}

/**
 * Delete player
 */
export function deletePlayer(id: string) {
	return pb.collection('players').delete(id);
}
