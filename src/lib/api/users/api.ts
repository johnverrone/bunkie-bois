import { pb } from '$lib/pocketbase';

/**
 * Link a player to user profile.
 */
export function linkPlayer(playerId: string) {
	const currentUserId = pb.authStore.model?.id;
	return pb.collection('users').update(currentUserId, { player: playerId });
}

/**
 * Unlink a player from a user profile.
 */
export function unlinkPlayer() {
	const currentUserId = pb.authStore.model?.id;
	return pb.collection('users').update(currentUserId, { player: null });
}
