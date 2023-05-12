import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { getCourses } = await makeSupabaseAPI(event);

	const courses = await getCourses();

	return {
		courses
	};
}) satisfies PageLoad;
