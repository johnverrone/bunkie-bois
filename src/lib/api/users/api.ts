import { pb } from '$lib/pocketbase';

/**
 * Link a player to user profile.
 */
export function linkPlayer(playerId: string) {
	const currentUserId = pb.authStore.model?.id;
	return pb.collection('users').update(currentUserId, { player: playerId });
}
