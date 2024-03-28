import type { LayoutLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async ({ fetch }) => {
	if (pb.authStore.isAuthRecord) {
		await pb.collection('users').authRefresh({ fetch });
	}

	return {
		isAuthed: pb.authStore.isValid,
		role: {
			isAdmin: pb.authStore.model?.role === 'admin'
		}
	};
}) satisfies LayoutLoad;

export const ssr = false;
