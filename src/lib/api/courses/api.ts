import type { CreateTeeBoxRequest } from './schema';
import { pb } from '$lib/pocketbase';

/**
 * Create a course
 */
export function createCourse(name: string) {
	return pb.collection('courses').create({ name });
}

/**
 * Get names of all courses
 */
export function getCourses() {
	return pb.collection('courses').getFullList();
}

/**
 * Get course details
 */
export function getCourseDetails(courseId: string) {
	return pb
		.collection('courses')
		.getOne(courseId, { expand: 'teeBoxes_via_course,teeBoxes_via_course.holeInfo_via_teeBox' });
}

/**
 * Create tee box
 */
export async function createTeeBox(req: CreateTeeBoxRequest) {
	const holeData = Object.entries(req.holes);

	if (holeData.length !== 9 && holeData.length !== 18) {
		throw new Error('Incomplete hole information.');
	}

	// create teeBoxes record
	const teeBox = await pb.collection('teeBoxes').create({
		course: req.courseId,
		name: req.name,
		rating: req.rating,
		slope: req.slope
	});

	// create holeInfo records
	holeData.map(([holeNumber, d]) =>
		pb.collection('holeInfo').create(
			{
				teeBox: teeBox.id,
				holeNumber,
				...d
			},
			{ requestKey: `POST holeInfo/${teeBox.id}/${holeNumber}` }
		)
	);
}
