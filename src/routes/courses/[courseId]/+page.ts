import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { supabaseClient } = await getSupabase(event);
  const { params } = event;

	const { data, error: dbError } = await supabaseClient
    .from('courses')
    .select(`
      id,
      name,
      tee_boxes (
        id,
        course_id,
        name,
        rating,
        slope,
        hole_info (
          tee_box_id,
          hole_number,
          par,
          yardage,
          handicap
        )
      )
    `)
    .eq('id', params.courseId)
    .limit(1)
    .single();

	if (dbError) {
		throw error(500, {
			message: dbError.message
		});
	}

  // TODO: workaround until this is implemented: https://github.com/supabase/postgrest-js/issues/303
  type Identity<T> = 
    T extends object 
    ? { [K in keyof T]: T[K] }
    : T;
  type ArrayElement<T> = T extends readonly unknown[] ? T[0] : never;
  type ResultRow = typeof data;
  type PatchedHoleInfo = Identity<ArrayElement<ArrayElement<ResultRow['tee_boxes']>['hole_info']>>;
  type PatchedTeeBoxes = Identity<Omit<ArrayElement<ResultRow['tee_boxes']>, 'hole_info'> & { 'hole_info': PatchedHoleInfo[] }>;
  type PatchedResult = Identity<Omit<ResultRow, 'tee_boxes'> & { 'tee_boxes': PatchedTeeBoxes[] }>;


	return {
		course: data as PatchedResult
	};
}) satisfies PageLoad;