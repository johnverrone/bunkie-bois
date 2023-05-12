import * as api from '@api';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { supabaseClient } = await getSupabase(event);
	
	const trips = await api.getTrips(supabaseClient);

	return {
		trips
	};

}) satisfies PageLoad;
