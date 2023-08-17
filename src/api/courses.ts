import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { ArrayElement, Prettify } from '../utils/typeHelpers';

interface TeeBoxConfig {
	name: string;
	rating: number;
	slope: number;
}

interface HoleInfo {
	holeNumber: number;
	par: number;
	yardage: number;
	handicap: number;
}

export function coursesAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Create new course
		 */
		createCourse: async function ({ name }: { name: string }) {
			const { data, error: dbError } = await supabaseClient
				.from('courses')
				.insert({
					name
				})
				.select('id')
				.limit(1)
				.single();

			if (dbError) return { error: dbError.message };
			return { data };
		},

		/**
		 * Create tee box
		 */
		createTeeBox: async function (
			courseId: number,
			teeBoxConfig: TeeBoxConfig,
			holeInfo: HoleInfo[]
		) {
			if (holeInfo.length !== 9 && holeInfo.length !== 18) {
				throw error(400, { message: 'Incomplete hole form' });
			}

			const { data, error: teeBoxDbError } = await supabaseClient
				.from('tee_boxes')
				.insert({
					course_id: courseId,
					name: teeBoxConfig.name,
					rating: teeBoxConfig.rating,
					slope: teeBoxConfig.slope
				})
				.select('id')
				.limit(1)
				.single();

			if (teeBoxDbError) return { error: teeBoxDbError.message };
			const teeBoxId = data.id;

			const { error: holesError } = await supabaseClient.from('hole_info').insert(
				holeInfo.map(({ holeNumber, par, yardage, handicap }) => ({
					tee_box_id: teeBoxId,
					hole_number: holeNumber,
					par,
					yardage,
					handicap
				}))
			);

			if (holesError) return { error: holesError.message };
			return { success: true };
		},

		/**
		 * Get names of all courses
		 */
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

		/**
		 * Get the details of a single course
		 */
		getCourseDetails: async function (courseId: number) {
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
