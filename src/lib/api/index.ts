import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { gamesAPI } from './games';

export async function makeSupabaseAPI(event: Parameters<typeof getSupabase>[0]) {
	const { session, supabaseClient } = await getSupabase(event);

	return {
		session,
		supabaseClient,
		...gamesAPI(supabaseClient)
	};
}

export * from './trips';
export * from './courses';
export * from './players';
export * from './rounds';
export * from './scores';
