import { Result } from '$lib/api/types';
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { Prettify, ArrayElement } from '$lib/utils/typeHelpers';
import { transformTeeBoxRequest } from './helpers';
import type { CreateCourseRequest, CreateTeeBoxRequest } from './schema';

export function coursesAPI(supabaseClient: TypedSupabaseClient) {
	/**
	 * Create new course
	 */
	async function createCourse({ name }: CreateCourseRequest) {
		const { data, error: dbError } = await supabaseClient
			.from('courses')
			.insert({
				name
			})
			.select('id')
			.limit(1)
			.single();

		if (dbError) return Result.error(dbError.message);
		return Result.ok(data);
	}

	/**
	 * Create tee box
	 */
	async function createTeeBox(request: CreateTeeBoxRequest) {
		const holeData = transformTeeBoxRequest(request);

		if (holeData.length !== 9 && holeData.length !== 18) {
			return Result.error('Incomplete hole information.');
		}

		const { data, error: teeBoxDbError } = await supabaseClient
			.from('tee_boxes')
			.insert({
				course_id: request.courseId,
				name: request.name,
				rating: request.rating,
				slope: request.slope
			})
			.select('id')
			.limit(1)
			.single();

		if (teeBoxDbError) return Result.error(teeBoxDbError.message);
		const teeBoxId = data.id;

		const { error: holesError } = await supabaseClient.from('hole_info').insert(
			holeData.map(({ holeNumber, par, yardage, handicap }) => ({
				tee_box_id: teeBoxId,
				hole_number: holeNumber,
				par,
				yardage,
				handicap
			}))
		);

		if (holesError) return Result.error(holesError.message);
		return Result.ok(teeBoxId);
	}

	/**
	 * Get names of all courses
	 */
	async function getCourses() {
		const { data, error: dbError } = await supabaseClient
			.from('courses')
			.select(
				`
          id,
          name
        `
			)
			.order('name', { ascending: true });

		if (dbError) throw error(500, 'There was an error loading the courses.');
		return data;
	}

	/**
	 * Get the details of a single course
	 */
	async function getCourseDetails(courseId: number) {
		if (Number.isNaN(courseId)) throw error(400, 'Invalid course id.');

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

		if (dbError) throw error(500, 'There was an error loading the course details.');

		// TODO: workaround until this is implemented: https://github.com/supabase/postgrest-js/issues/303
		type ResultRow = typeof data;
		type PatchedHoleInfo = Prettify<
			ArrayElement<ArrayElement<ResultRow['tee_boxes']>['hole_info']>
		>;
		type PatchedTeeBoxes = Prettify<
			Omit<ArrayElement<ResultRow['tee_boxes']>, 'hole_info'> & { hole_info: PatchedHoleInfo[] }
		>;
		type PatchedResult = Prettify<Omit<ResultRow, 'tee_boxes'> & { tee_boxes: PatchedTeeBoxes[] }>;

		return data as PatchedResult;
	}

	return {
		createCourse,
		createTeeBox,
		getCourseDetails,
		getCourses
	};
}
