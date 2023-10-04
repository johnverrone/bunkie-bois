import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { makeSupabaseAPI } from '@api';
import type { Prettify } from '@utils/typeHelpers';

export const load = (async (event) => {
	const { getTripById, getPlayers, getRounds, getCourses } = await makeSupabaseAPI(event);

	const {
		params: { tripId }
	} = event;

	const trip = await getTripById(tripId);
	const tripPlayers = await getPlayers(tripId);
	const rounds = await getRounds(tripId);
	const courses = await getCourses();

	type Course = Prettify<(typeof courses)[number]>;
	const coursesById = courses.reduce<Record<string, Course>>(
		(acc, curr) => ({ ...acc, [curr.id]: curr }),
		{}
	);

	const roundsWithCourseName = rounds.map(({ course_id, ...round }) => {
		const course = coursesById[course_id];
		if (!course) {
			throw error(500, { message: `error finding course ${course_id}` });
		}

		return {
			...round,
			course
		};
	});

	return {
		title: trip.name,
		trip,
		tripPlayers,
		rounds: roundsWithCourseName,
		courses: courses
	};
}) satisfies LayoutLoad;
