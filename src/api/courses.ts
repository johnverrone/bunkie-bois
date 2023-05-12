import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { Prettify } from '@utils/typeHelpers';

export async function getCourses(supabaseClient: TypedSupabaseClient) {
	const { data, error: dbError } = await supabaseClient.from('courses').select(`
			id,
			name
		`);

	if (dbError) {
		throw error(500, { message: dbError.message });
	}

	type Course = Prettify<typeof data[number]>;
	const courses = data.reduce<Record<string, Course>>(
		(acc, curr) => ({ ...acc, [curr.id]: curr }),
		{}
	);

	return courses;
}
