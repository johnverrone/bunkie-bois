import { getCourses } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	return {
		courses: await getCourses({ fetch })
	};
}) satisfies PageLoad;
