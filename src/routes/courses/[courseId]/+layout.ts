import { getCourseDetails } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load = (async ({ depends, params }) => {
	const { courseId } = params;
	depends(`courses/${courseId}`);

	return {
		course: await getCourseDetails(courseId)
	};
}) satisfies LayoutLoad;
