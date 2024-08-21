import type { LayoutLoad } from './$types';
import { pb, type User } from '$lib/pocketbase';
import { getPlayers } from '$lib/api';

export const load = (async ({ fetch }) => {
	if (pb.authStore.isAuthRecord && pb.authStore.isValid) {
		await pb.collection('users').authRefresh({ fetch });
	}
	const allPlayers = await getPlayers(undefined, { fetch });

	return {
		isAuthed: pb.authStore.isValid,
		allPlayers,
		user: pb.authStore.model as User | undefined,
		role: {
			isAdmin: pb.authStore.model?.role === 'admin'
		}
	};
}) satisfies LayoutLoad;

export const ssr = false;
