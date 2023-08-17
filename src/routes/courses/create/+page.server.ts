import { makeSupabaseAPI } from '@api';
import { redirect, type Actions, error, fail } from '@sveltejs/kit';
import { z } from 'zod';

export const actions = {
	createCourse: async (event) => {
		const { request } = event;
		const { session, createCourse } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());
		const courseSchema = z.object({
			name: z.string()
		});

		let courseId: number | undefined = undefined;
		try {
			const { name } = courseSchema.parse(data);
			const result = await createCourse({ name });
			if (result.error) {
				return fail(500, { message: result.error });
			}
			courseId = result.data?.id;
		} catch (error) {
			return fail(400, { message: 'invalid course config' });
		}
		throw redirect(303, `/courses/${courseId}`);
	}
} satisfies Actions;
