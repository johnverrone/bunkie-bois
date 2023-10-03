import type { LayoutServerLoad } from './$types';
import { makeSupabaseAPI } from '@api';

export const load = (async (event) => {
	const { session } = await makeSupabaseAPI(event);

	return {
		session
	};
}) satisfies LayoutServerLoad;
