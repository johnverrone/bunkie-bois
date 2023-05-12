import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { ArrayElement, Prettify } from '../utils/typeHelpers';

export function coursesAPI(supabaseClient: TypedSupabaseClient) {
	return {
		getCourses: async function () {
			const { data, error: dbError } = await supabaseClient.from('courses').select(`
				id,
				name
			`);

			if (dbError) {
				throw error(500, { message: dbError.message });
			}

			return data;
		},

		getCourseDetails: async function (courseId: string) {
			const { data, error: dbError } = await supabaseClient
				.from('courses')
				.select(
					`
				id,
				name,
				tee_boxes (
					id,
					course_id,
					name,
					rating,
					slope,
					hole_info (
						tee_box_id,
						hole_number,
						par,
						yardage,
						handicap
					)
				)
			`
				)
				.eq('id', courseId)
				.limit(1)
				.single();

			if (dbError) {
				throw error(500, {
					message: dbError.message
				});
			}

			// TODO: workaround until this is implemented: https://github.com/supabase/postgrest-js/issues/303
			type ResultRow = typeof data;
			type PatchedHoleInfo = Prettify<
				ArrayElement<ArrayElement<ResultRow['tee_boxes']>['hole_info']>
			>;
			type PatchedTeeBoxes = Prettify<
				Omit<ArrayElement<ResultRow['tee_boxes']>, 'hole_info'> & { hole_info: PatchedHoleInfo[] }
			>;
			type PatchedResult = Prettify<
				Omit<ResultRow, 'tee_boxes'> & { tee_boxes: PatchedTeeBoxes[] }
			>;

			return data as PatchedResult;
		}
	};
}
