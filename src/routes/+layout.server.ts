import type { LayoutServerLoad } from './$types';
import { makeSupabaseAPI } from '$lib/api';

export const load = (async (event) => {
	const { session } = await makeSupabaseAPI(event);

	return {
		session
	};
}) satisfies LayoutServerLoad;
