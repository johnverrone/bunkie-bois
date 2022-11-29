import { error } from '@sveltejs/kit';
import { trips, rounds, type Round } from '../../data/trips';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ params }) => {
	const trip = trips.find((t) => t.id === params.tripId);

	if (trip) {
		const tripRounds = trip.roundIds
			?.map((roundId) => rounds.find((round) => round.id === roundId))
			.filter((round): round is Round => !!round);

		return {
			id: trip.id,
			name: trip.name,
			rounds: tripRounds
		};
	}

	throw error(404, 'Trip not found');
};
