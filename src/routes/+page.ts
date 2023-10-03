import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { makeSupabaseAPI } from '@api';

export const load = (async (event) => {
	const { session } = await makeSupabaseAPI(event);
	if (!session) return;

	throw redirect(307, '/trips');
}) satisfies PageLoad;
