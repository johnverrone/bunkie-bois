import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async (event) => {
	const { session } = await getSupabase(event);
	if (!session) return;

	throw redirect(307, '/trips');
}) satisfies PageLoad;
