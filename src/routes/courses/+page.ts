import { getCourses } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ depends, fetch }) => {
	depends('courses');

	return {
		courses: await getCourses({ fetch })
	};
}) satisfies PageLoad;
