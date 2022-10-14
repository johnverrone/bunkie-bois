import { error } from '@sveltejs/kit';
import { players, type Player } from '../../data/players';
import { trips, rounds, type Round } from '../../data/trips';
import type { LayoutLoad } from './$types';

export function load({ params }: LayoutLoad) {
	const trip = trips.find((t) => t.id === params.tripId);

	if (trip) {
		const tripRounds = trip.roundIds
			?.map((roundId) => rounds.find((round) => round.id === roundId))
			.filter((round): round is Round => !!round);

		const tripPlayers: Player[] = [];
		players.forEach((player) => {
			if (player.tripIds.includes(trip.id)) tripPlayers.push(player);
		});

		return {
			id: trip.id,
			name: trip.name,
			rounds: tripRounds,
			players: tripPlayers
		};
	}

	throw error(404, 'Trip not found');
}
