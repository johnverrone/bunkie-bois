import { makeSupabaseAPI } from '@api';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { session, getCourses } = await makeSupabaseAPI(event);
	if (!session) throw error(403, { message: 'Unauthorized' });

	const response = await getCourses();
	if (!response.ok) throw error(response.status, response.error);

	return {
		courses: response.data
	};
}) satisfies PageLoad;
