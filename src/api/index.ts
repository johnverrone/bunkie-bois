import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { coursesAPI } from './courses';
import { playersAPI } from './players';
import { tripsAPI } from './trips';
import { roundsAPI } from './rounds';
import { gamesAPI } from './games';

export async function makeSupabaseAPI(event: Parameters<typeof getSupabase>[0]) {
	const { session, supabaseClient } = await getSupabase(event);

	return {
		session,
		supabaseClient,
		...coursesAPI(supabaseClient),
		...playersAPI(supabaseClient),
		...roundsAPI(supabaseClient),
		...tripsAPI(supabaseClient),
		...gamesAPI(supabaseClient)
	};
}
