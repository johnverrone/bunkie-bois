import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { Result } from '../types';
import type { CreatePlayerRequest, DeletePlayerRequest, UpdatePlayerRequest } from './schema';

export function playersAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Get all players (optionally filter by trip)
		 */
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

			if (dbError) throw error(500, { message: dbError.message });

			const tripPlayers = data.map((player) => ({
				id: player.id,
				name: player.name,
				handicap: player.handicap
			}));

			return tripPlayers;
		},

		/**
		 * Create a new player
		 */
		createPlayer: async function ({ name, handicap }: CreatePlayerRequest) {
			const { data: player, error: dbError } = await supabaseClient
				.from('players')
				.insert({ name, handicap })
				.select('id')
				.single();

			if (dbError) return Result.error(dbError.message);
			return Result.ok(player);
		},

		/**
		 * Add player to trip
		 */
		addPlayerToTrip: async function (playerId: number, tripId: number) {
			const { error: dbError } = await supabaseClient.from('trip_players').insert({
				player_id: playerId,
				trip_id: tripId
			});

			if (dbError) return Result.error(dbError.message);
			return Result.ok(true);
		},

		/**
		 * Update player
		 */
		updatePlayer: async function ({ playerId, name, handicap }: UpdatePlayerRequest) {
			const { error: pgError } = await supabaseClient
				.from('players')
				.update({ name, handicap })
				.eq('id', playerId);

			if (pgError) return Result.error(pgError.message);
			return Result.ok(true);
		},

		/**
		 * Delete player from trip
		 */
		deletePlayer: async function ({ tripId, playerId }: DeletePlayerRequest) {
			const { error: tripPlayerError } = await supabaseClient
				.from('trip_players')
				.delete()
				.eq('trip_id', tripId)
				.eq('player_id', playerId);
			if (tripPlayerError) return Result.error(tripPlayerError.message);

			const { error: playerError } = await supabaseClient
				.from('players')
				.delete()
				.eq('id', playerId);

			if (playerError) return Result.error(playerError.message);
			return Result.ok(true);
		}
	};
}
