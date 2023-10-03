import { makeSupabaseAPI, coursesSchemas } from '@api';
import { redirect, type Actions, fail } from '@sveltejs/kit';

export const actions = {
	createCourse: async (event) => {
		const { request } = event;
		const { createCourse } = await makeSupabaseAPI(event);

		const requestData = Object.fromEntries(await request.formData());
		const parseResult = coursesSchemas.createCourseSchema.safeParse(requestData);
		if (!parseResult.success) return fail(400, { message: 'Invalid course name.' });

		const response = await createCourse(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error creating course.' });

		throw redirect(303, `/courses/${response.data.id}`);
	}
} satisfies Actions;
