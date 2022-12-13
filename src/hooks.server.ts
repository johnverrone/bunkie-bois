import '$lib/supabaseClient';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// protect requests to all routes except root
	if (event.url.pathname !== '/') {
		const { session } = await getSupabase(event);

		if (!session) {
			throw redirect(303, '/');
		}
	}

	return resolve(event);
};
