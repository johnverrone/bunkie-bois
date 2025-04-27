import type { LayoutLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async ({ fetch }) => {
	if (!pb.authStore.isSuperuser && pb.authStore.isValid) {
		await pb.collection('users').authRefresh({ fetch });
	}

	return {
		isAuthed: pb.authStore.isValid,
		role: {
			isAdmin: pb.authStore.record?.role === 'admin'
		},
		loggedInPlayer: pb.authStore.record?.player
	};
}) satisfies LayoutLoad;

export const ssr = false;
