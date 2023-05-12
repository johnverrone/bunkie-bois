import { makeSupabaseAPI } from '@api';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { getCourseDetails } = await makeSupabaseAPI(event);
  const { params: { courseId } } = event;

  const course = await getCourseDetails(courseId);

  return {
    course,
  }

}) satisfies PageLoad;