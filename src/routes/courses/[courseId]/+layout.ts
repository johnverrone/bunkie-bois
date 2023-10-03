import { makeSupabaseAPI } from '@api';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { getCourseDetails } = await makeSupabaseAPI(event);
	const {
		params: { courseId }
	} = event;

	const response = await getCourseDetails(parseInt(courseId, 10));
	if (!response.ok) throw error(response.status, response.error);

	return {
		course: response.data
	};
}) satisfies LayoutLoad;
