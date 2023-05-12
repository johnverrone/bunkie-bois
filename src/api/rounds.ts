import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { getCourses } from './courses';

export async function getRounds(supabaseClient: TypedSupabaseClient, tripId?: string) {
	const { data: roundsData, error: roundsError } = await supabaseClient
		.from('rounds')
		.select(
			`
			id,
			trip_id,
			course_id,
			name,
			date
		`
		)
		.eq('trip_id', tripId);

	if (roundsError) {
		throw error(500, {
			message: roundsError.message
		});
	}

	const courses = await getCourses(supabaseClient);

	const rounds = roundsData.map(({ id, name, date, course_id }) => {
		const course = courses[course_id];
		if (!course) {
			throw error(500, { message: `error finding course ${course_id}` });
		}

		return {
			id,
			name,
			course,
			date: date ? new Date(date) : null
		};
	});

	return rounds;
}
