import { makeSupabaseAPI } from '$lib/api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { getCourses } = await makeSupabaseAPI(event);

	return {
		courses: await getCourses()
	};
}) satisfies PageLoad;
