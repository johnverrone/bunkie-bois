import { makeSupabaseAPI } from '@api';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { getCourseDetails } = await makeSupabaseAPI(event);
	const {
		params: { courseId }
	} = event;

	const course = await getCourseDetails(parseInt(courseId, 10));

	return {
		course
	};
}) satisfies LayoutLoad;
