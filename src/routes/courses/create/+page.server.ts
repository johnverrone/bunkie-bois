import { makeSupabaseAPI } from '@api';
import { redirect, type Actions, error, fail } from '@sveltejs/kit';

export const actions = {
	createCourse: async (event) => {
		const { request } = event;
		const { session, createCourse } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const response = await createCourse(request);
		if (!response.ok) {
			return fail(response.status, { message: response.error });
		}

		throw redirect(303, `/courses/${response.data}`);
	}
} satisfies Actions;
