import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase';

export const load = (async () => {
	if (!pb.authStore.isValid) return;
	redirect(307, '/trips');
}) satisfies PageLoad;
