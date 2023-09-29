import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';

export function usersAPI(supabaseClient: TypedSupabaseClient) {
	return {
		getUserRole: async function (userId: string) {
			const { data, error: dbError } = await supabaseClient
				.from('user_roles')
				.select('role')
				.eq('user_id', userId)
				.limit(1)
				.maybeSingle();

			if (dbError) {
				console.error(dbError.message);
			}

			return data?.role;
		}
	};
}
