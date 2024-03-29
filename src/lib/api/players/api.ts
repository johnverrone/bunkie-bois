import type { CreatePlayerRequest, UpdatePlayerRequest } from './schema';
import { pb } from '$lib/pocketbase';
import type { SendOptions } from 'pocketbase';

/**
 * Get all players for trip
 */
export function getPlayers(tripId?: string, opts?: SendOptions) {
	return pb.collection('players').getFullList({
		...(tripId ? { filter: `trips?~'${tripId}'` } : {}),
		sort: '+name',
		...opts
	});
}

/**
 * Add a player to a trip
 */
export function addPlayerToTrip(playerId: string, tripId: string, opts?: SendOptions) {
	return pb.collection('players').update(
		playerId,
		{
			'trips+': tripId
		},
		opts
	);
}

/**
 * Create a player
 */
export function createPlayer({ name, handicap, tripId }: CreatePlayerRequest, opts?: SendOptions) {
	const data = {
		name,
		handicap,
		trips: [tripId]
	};

	return pb.collection('players').create(data, opts);
}

/**
 * Update player
 */
export function updatePlayer({ id, name, handicap }: UpdatePlayerRequest, opts?: SendOptions) {
	const data = {
		name,
		handicap
	};

	return pb.collection('players').update(id, data, opts);
}

/**
 * Delete player
 */
export function deletePlayer(id: string, opts?: SendOptions) {
	return pb.collection('players').delete(id, opts);
}
