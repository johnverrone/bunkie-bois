import { error } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { supabaseClient } = await getSupabase(event);

	const { data, error: dbError } = await supabaseClient.from('trips').select();

	if (dbError) {
		throw error(500, {
			message: dbError.message
		});
	}

	return {
		trips: data
	};
}) satisfies PageLoad;
