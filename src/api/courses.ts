import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { z } from 'zod';
import type { ArrayElement, Prettify } from '../utils/typeHelpers';
import { Result } from './types';

export function coursesAPI(supabaseClient: TypedSupabaseClient) {
	return {
		/**
		 * Create new course
		 */
		createCourse: async function (request: Request) {
			const requestData = Object.fromEntries(await request.formData());
			const courseSchema = z.object({
				name: z.string()
			});

			const result = courseSchema.safeParse(requestData);
			if (!result.success) return Result.error(400, 'Invalid course name.');

			const { name } = result.data;

			const { data, error: dbError } = await supabaseClient
				.from('courses')
				.insert({
					name
				})
				.select('id')
				.limit(1)
				.single();

			if (dbError) return Result.error(500, 'There was an error creating course.');
			return Result.ok(data.id);
		},

		/**
		 * Create tee box
		 */
		createTeeBox: async function (request: Request) {
			const requestData = Object.fromEntries(await request.formData());
			const result = teeBoxSchema.safeParse(requestData);
			if (!result.success) return Result.error(400, 'Invalid hole information');
			const teeBox = result.data;
			const holeData = transformHoleData(teeBox);

			if (holeData.length !== 9 && holeData.length !== 18) {
				return Result.error(400, 'Incomplete hole information.');
			}

			const { data, error: teeBoxDbError } = await supabaseClient
				.from('tee_boxes')
				.insert({
					course_id: teeBox.courseId,
					name: teeBox.name,
					rating: teeBox.rating,
					slope: teeBox.slope
				})
				.select('id')
				.limit(1)
				.single();

			if (teeBoxDbError) return Result.error(500, 'There was an error creating the tee box.');
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

			if (holesError) return Result.error(500, 'There was an error creating the tee box.');
			return Result.ok(teeBoxId);
		},

		/**
		 * Get names of all courses
		 */
		getCourses: async function () {
			const { data, error: dbError } = await supabaseClient
				.from('courses')
				.select(
					`
						id,
						name
					`
				)
				.order('name', { ascending: true });

			if (dbError) return Result.error(500, 'There was an error loading the courses.');
			return Result.ok(data);
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

			if (dbError) return Result.error(500, 'There was an error loading the course details.');

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

			return Result.ok(data as PatchedResult);
		}
	};
}

// SCHEMAS

const teeBoxSchema = z.object({
	courseId: z.coerce.number(),
	name: z.string(),
	rating: z.coerce.number(),
	slope: z.coerce.number(),
	'hole-1-par': z.coerce.number(),
	'hole-1-yardage': z.coerce.number(),
	'hole-1-handicap': z.coerce.number(),
	'hole-2-par': z.coerce.number(),
	'hole-2-yardage': z.coerce.number(),
	'hole-2-handicap': z.coerce.number(),
	'hole-3-par': z.coerce.number(),
	'hole-3-yardage': z.coerce.number(),
	'hole-3-handicap': z.coerce.number(),
	'hole-4-par': z.coerce.number(),
	'hole-4-yardage': z.coerce.number(),
	'hole-4-handicap': z.coerce.number(),
	'hole-5-par': z.coerce.number(),
	'hole-5-yardage': z.coerce.number(),
	'hole-5-handicap': z.coerce.number(),
	'hole-6-par': z.coerce.number(),
	'hole-6-yardage': z.coerce.number(),
	'hole-6-handicap': z.coerce.number(),
	'hole-7-par': z.coerce.number(),
	'hole-7-yardage': z.coerce.number(),
	'hole-7-handicap': z.coerce.number(),
	'hole-8-par': z.coerce.number(),
	'hole-8-yardage': z.coerce.number(),
	'hole-8-handicap': z.coerce.number(),
	'hole-9-par': z.coerce.number(),
	'hole-9-yardage': z.coerce.number(),
	'hole-9-handicap': z.coerce.number(),
	'hole-10-par': z.coerce.number(),
	'hole-10-yardage': z.coerce.number(),
	'hole-10-handicap': z.coerce.number(),
	'hole-11-par': z.coerce.number(),
	'hole-11-yardage': z.coerce.number(),
	'hole-11-handicap': z.coerce.number(),
	'hole-12-par': z.coerce.number(),
	'hole-12-yardage': z.coerce.number(),
	'hole-12-handicap': z.coerce.number(),
	'hole-13-par': z.coerce.number(),
	'hole-13-yardage': z.coerce.number(),
	'hole-13-handicap': z.coerce.number(),
	'hole-14-par': z.coerce.number(),
	'hole-14-yardage': z.coerce.number(),
	'hole-14-handicap': z.coerce.number(),
	'hole-15-par': z.coerce.number(),
	'hole-15-yardage': z.coerce.number(),
	'hole-15-handicap': z.coerce.number(),
	'hole-16-par': z.coerce.number(),
	'hole-16-yardage': z.coerce.number(),
	'hole-16-handicap': z.coerce.number(),
	'hole-17-par': z.coerce.number(),
	'hole-17-yardage': z.coerce.number(),
	'hole-17-handicap': z.coerce.number(),
	'hole-18-par': z.coerce.number(),
	'hole-18-yardage': z.coerce.number(),
	'hole-18-handicap': z.coerce.number()
});

type TeeBox = z.infer<typeof teeBoxSchema>;

function transformHoleData(teeBox: TeeBox) {
	const reducedData = Object.entries(teeBox)
		.filter(([key]) => key.substring(0, 4) === 'hole')
		.map(([key, value]) => [key.split('-'), value] as const)
		.reduce<{
			[key: number]: { holeNumber: number; par: number; yardage: number; handicap: number };
		}>((acc, [key, value]) => {
			const [, hole, attr] = key;
			if (!hole || !attr) return acc;
			const holeNumber = parseInt(hole, 10);

			const existingHoleInfo = acc[holeNumber];
			const holeInfo = existingHoleInfo ?? {
				holeNumber,
				par: 0,
				yardage: 0,
				handicap: 0
			};

			return {
				...acc,
				[holeNumber]: {
					...holeInfo,
					[attr]: value
				}
			};
		}, {});

	return Object.values(reducedData);
}
