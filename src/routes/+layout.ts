import type { LayoutLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load = (async () => {
	if (pb.authStore.isAuthRecord) {
		await pb.collection('users').authRefresh();
	}

	return {
		role: {
			// TODO: get from user attributes
			isAdmin: pb.authStore.model?.role === 'admin'
		}
	};
}) satisfies LayoutLoad;

export const ssr = false;
