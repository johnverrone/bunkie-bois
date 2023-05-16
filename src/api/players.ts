import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error, fail } from '@sveltejs/kit';

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

		/**
		 * Create a new player
		 */
		createPlayer: async function ({ name, handicap }: { name: string; handicap: number }) {
			const { data: player, error: dbError } = await supabaseClient
				.from('players')
				.insert({ name, handicap })
				.select('id')
				.single();

			if (dbError) {
				return {
					playerId: null,
					error: dbError.message
				};
			}

			return { playerId: player.id, error: null };
		},

		/**
		 * Add player to trip
		 */
		addPlayerToTrip: async function (playerId: number, tripId: number) {
			const { error: dbError } = await supabaseClient.from('trip_players').insert({
				player_id: playerId,
				trip_id: tripId
			});

			if (dbError) return fail(500, { message: dbError.message });
		},

		/**
		 * Update player
		 */
		updatePlayer: async function (
			id: number,
			{ name, handicap }: { name: string; handicap: number }
		) {
			const { error: pgError } = await supabaseClient
				.from('players')
				.update({ name, handicap })
				.eq('id', id);

			if (pgError) return fail(500, { message: pgError.message });
		},

		/**
		 * Delete player from trip
		 */
		deletePlayer: async function (tripId: number, playerId: number) {
			const { error: tripPlayerError } = await supabaseClient
				.from('trip_players')
				.delete()
				.eq('trip_id', tripId)
				.eq('player_id', playerId);
			if (tripPlayerError) return fail(500, { message: tripPlayerError.message });

			const { error: playerError } = await supabaseClient
				.from('players')
				.delete()
				.eq('id', playerId);

			if (playerError) return fail(500, { message: playerError.message });
		},

		/**
		 * Log score for a player
		 */
		logScore: async function ({
			playerId,
			roundId,
			teeBoxId,
			courseHandicap,
			scores
		}: {
			playerId: number;
			roundId: number;
			teeBoxId: number;
			courseHandicap: number;
			scores: { [key: number]: number };
		}) {
			// create scorecard entry
			const { data, error: scorecardError } = await supabaseClient
				.from('scorecards')
				.insert({
					player_id: playerId,
					round_id: roundId,
					tee_box_id: teeBoxId,
					player_handicap: courseHandicap
				})
				.select('id')
				.single();

			if (scorecardError) {
				return {
					ok: false as const,
					error: scorecardError.message
				};
			}
			const scorecardId = data.id;

			// add scores to hole_scores
			const scoresToInsert = Object.entries(scores).map(([holeNumber, score]) => ({
				scorecard_id: scorecardId,
				hole_number: parseInt(holeNumber),
				score
			}));
			const { error: holeScoresError } = await supabaseClient
				.from('hole_scores')
				.insert(scoresToInsert);

			if (holeScoresError) {
				return {
					ok: false as const,
					error: holeScoresError.message
				};
			}

			return {
				ok: true
			};
		},

		/**
		 * Get scorecard for a player's round
		 */
		getScorecard: async function ({ playerId, roundId }: { playerId: number; roundId: number }) {
			const { data: scorecard, error: scorecardError } = await supabaseClient
				.from('scorecards')
				.select('*')
				.eq('player_id', playerId)
				.eq('round_id', roundId)
				.single();

			if (scorecardError || !scorecard) {
				throw error(500, {
					message: scorecardError.message || 'error fetching scorecard'
				});
			}

			const { data, error: dbError } = await supabaseClient
				.from('hole_scores')
				.select('*')
				.eq('scorecard_id', scorecard.id);

			if (dbError) {
				throw error(500, {
					message: dbError.message
				});
			}

			return {
				...scorecard,
				hole_scores: data
			};
		}
	};
}
