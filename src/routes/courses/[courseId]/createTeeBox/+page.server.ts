import { makeSupabaseAPI } from '@api';
import { redirect, type Actions, error, fail } from '@sveltejs/kit';

export const actions = {
	createTeeBox: async (event) => {
		const { request } = event;
		const { session, createTeeBox } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const response = await createTeeBox(request);
		if (!response.ok) {
			return fail(response.status, { message: response.error });
		}

		throw redirect(303, `/courses/${event.params.courseId}`);
	}
} satisfies Actions;
