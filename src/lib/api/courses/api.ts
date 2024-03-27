import type { CreateTeeBoxRequest } from './schema';
import { pb } from '$lib/pocketbase';
import type { SendOptions } from 'pocketbase';

/**
 * Create a course
 */
export function createCourse(name: string, opts?: SendOptions) {
	return pb.collection('courses').create({ name }, opts);
}

/**
 * Get names of all courses
 */
export function getCourses(opts?: SendOptions) {
	return pb.collection('courses').getFullList(opts);
}

/**
 * Get course details
 */
export function getCourseDetails(courseId: string, opts?: SendOptions) {
	return pb.collection('courses').getOne(courseId, {
		expand: 'teeBoxes_via_course,teeBoxes_via_course.holeInfo_via_teeBox',
		...opts
	});
}

/**
 * Create tee box
 */
export async function createTeeBox(req: CreateTeeBoxRequest, opts?: SendOptions) {
	const holeData = Object.entries(req.holes);

	if (holeData.length !== 9 && holeData.length !== 18) {
		throw new Error('Incomplete hole information.');
	}

	// create teeBoxes record
	const teeBox = await pb.collection('teeBoxes').create(
		{
			course: req.courseId,
			name: req.name,
			rating: req.rating,
			slope: req.slope
		},
		opts
	);

	// create holeInfo records
	holeData.map(([holeNumber, d]) =>
		pb.collection('holeInfo').create(
			{
				teeBox: teeBox.id,
				holeNumber,
				...d
			},
			{ requestKey: `POST holeInfo/${teeBox.id}/${holeNumber}`, ...opts }
		)
	);
}
