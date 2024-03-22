import { getCourses } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ depends }) => {
	depends('courses');

	return {
		courses: await getCourses()
	};
}) satisfies PageLoad;
