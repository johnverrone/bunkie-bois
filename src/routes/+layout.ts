import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';

export const load = (async (event) => {
	const { session } = await getSupabase(event);
	return { session };
}) satisfies LayoutLoad;
