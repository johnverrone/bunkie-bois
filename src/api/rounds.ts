import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { coursesAPI } from './courses';
import type { Prettify } from '../utils/typeHelpers';

export function roundsAPI(supabaseClient: TypedSupabaseClient) {
	return {
		getRounds: async function (tripId?: string) {
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

			const courses = await coursesAPI(supabaseClient).getCourses();
			type Course = Prettify<typeof courses[number]>;
			const coursesById = courses.reduce<Record<string, Course>>(
				(acc, curr) => ({ ...acc, [curr.id]: curr }),
				{}
			);

			const rounds = roundsData.map(({ id, name, date, course_id }) => {
				const course = coursesById[course_id];
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
	};
}
