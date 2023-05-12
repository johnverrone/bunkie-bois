import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error, fail } from '@sveltejs/kit';

export function playersAPI(supabaseClient: TypedSupabaseClient) {
	return {
		getPlayers: async function (tripId?: string) {
			const { data, error: dbError } = await supabaseClient
				.from('players')
				.select(
					`
      id, 
      name,
      handicap,
      trips (
        id
      )
    `
				)
				.eq('trips.id', tripId);

			if (dbError) {
				throw error(500, {
					message: dbError.message
				});
			}

			const tripPlayers = data.map((player) => ({
				id: player.id,
				name: player.name,
				handicap: player.handicap
			}));

			return tripPlayers;
		},
		createPlayer: async function ({ name, handicap }: { name: string; handicap: number }) {
			const { error: dbError } = await supabaseClient.from('players').insert({ name, handicap });

			if (dbError) {
				return fail(500, {
					message: dbError.message
				});
			}
		}
	};
}
