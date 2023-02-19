import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { Prettify } from '@utils/typeHelpers';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) throw redirect(303, '/');

	const { params } = event;

	const { data: trip, error: tripError } = await supabaseClient
		.from('trips')
		.select()
		.eq('id', params.tripId)
		.limit(1)
		.single();

	if (tripError) {
		throw error(500, {
			message: tripError.message
		});
	}

	const { data: tripPlayersData, error: tripPlayersError } = await supabaseClient
		.from('players')
		.select(`
			id,
			name,
			handicap,
			trips (
				id
			)
		`)
		.eq('trips.id', params.tripId);

	if (tripPlayersError) {
		throw error(500, {
			message: tripPlayersError.message
		});
	}

	const tripPlayers = tripPlayersData.map((player) => ({
		id: player.id,
		name: player.name,
		handicap: player.handicap
	}));

	const { data: coursesData, error: courseError } = await supabaseClient
		.from('courses')
		.select(`
			id,
			name
		`);

	if (courseError) {
		throw error(500, { message: courseError.message });
	}

	type Course = Prettify<typeof coursesData[number]>;
	const courses = coursesData.reduce<Record<string, Course>>((acc, curr) => ({	...acc, [curr.id]: curr }), {});

	const { data: roundsData, error: roundsError } = await supabaseClient
		.from('rounds')
		.select(`
			id,
			trip_id,
			course_id,
			name,
			date
		`)
		.eq('trip_id', params.tripId);

	if (roundsError) {
		throw error(500, {
			message: roundsError.message
		});
	}

	const rounds = roundsData.map(({ id, name, date, course_id }) => {
		const course = courses[course_id];
		if (!course) {
			throw error(500, { message: `error finding course ${course_id}`});
		}

		return ({
			id,
			name,
			course,
			date: date ? new Date(date) : null
		})
	});

	if (trip) {
		return {
			title: trip.name,
			trip,
			tripPlayers,
			rounds,
			courses,
		};
	}

	throw error(404, 'Trip not found');
}) satisfies LayoutLoad;
