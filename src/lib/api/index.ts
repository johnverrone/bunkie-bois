import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { coursesAPI, coursesSchemas } from './courses';
import { playersAPI, playersSchemas } from './players';
import { tripsAPI, tripsSchemas } from './trips';
import { roundsAPI, roundsSchemas } from './rounds';
import { gamesAPI } from './games';
import { scoresAPI, scoresSchemas } from './scores';
import { usersAPI } from './users';

export { coursesSchemas, playersSchemas, tripsSchemas, roundsSchemas, scoresSchemas };

export async function makeSupabaseAPI(event: Parameters<typeof getSupabase>[0]) {
	const { session, supabaseClient } = await getSupabase(event);

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
