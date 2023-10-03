import { makeSupabaseAPI, schemas } from '@api';
import { redirect, type Actions, fail } from '@sveltejs/kit';

export const actions = {
	createTeeBox: async (event) => {
		const { request } = event;
		const { createTeeBox } = await makeSupabaseAPI(event);

		const requestData = Object.fromEntries(await request.formData());
		const parseResult = schemas.createTeeBoxSchema.safeParse(requestData);
		if (!parseResult.success) return fail(400, { message: 'Invalid hole information.' });

		const response = await createTeeBox(parseResult.data);
		if (!response.ok) return fail(500, { message: 'There was an error creating the tee box.' });

		throw redirect(303, `/courses/${event.params.courseId}`);
	}
} satisfies Actions;
