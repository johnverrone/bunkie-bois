import { makeSupabaseAPI } from '$lib/api';
import type { LayoutLoad } from './$types';

export const load = (async (event) => {
	const { getCourseDetails } = await makeSupabaseAPI(event);
	const {
		params: { courseId }
	} = event;

	return {
		course: await getCourseDetails(+courseId)
	};
}) satisfies LayoutLoad;
