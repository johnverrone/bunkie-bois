import { getCourseDetails } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load = (async ({ depends, params, fetch }) => {
	const { courseId } = params;
	depends(`courses/${courseId}`);

	return {
		course: await getCourseDetails(courseId, { fetch })
	};
}) satisfies LayoutLoad;
