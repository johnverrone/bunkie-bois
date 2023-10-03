import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { coursesAPI, coursesSchemas } from './courses';
import { playersAPI, playersSchemas } from './players';
import { tripsAPI } from './trips';
import { roundsAPI } from './rounds';
import { gamesAPI } from './games';
import { scoresAPI } from './scores';
import { usersAPI } from './user';
import { error } from '@sveltejs/kit';

export const schemas = {
	...coursesSchemas,
	...playersSchemas
};

export async function makeSupabaseAPI(event: Parameters<typeof getSupabase>[0]) {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) throw error(403, { message: 'Unauthorized' });

	return {
		session,
		supabaseClient,
		...coursesAPI(supabaseClient),
		...playersAPI(supabaseClient),
		...roundsAPI(supabaseClient),
		...tripsAPI(supabaseClient),
		...gamesAPI(supabaseClient),
		...scoresAPI(supabaseClient),
		...usersAPI(supabaseClient)
	};
}
