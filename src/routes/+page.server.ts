import { error } from '@sveltejs/kit';
import { supabase } from '$lib/server/supabaseClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const { data, error: dbError } = await supabase.from('trips').select();

	if (dbError) {
		throw error(500, {
			message: dbError.message
		});
	}

	return {
		trips: data
	};
};
