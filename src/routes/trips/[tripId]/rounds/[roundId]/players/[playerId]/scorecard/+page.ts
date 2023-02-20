import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error, redirect } from '@sveltejs/kit';
import type { ArrayElement, Prettify } from '@utils/typeHelpers';
import type { PageLoad } from './$types';

export const load = (async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) throw redirect(303, '/');

	const { params, parent } = event;

	const { rounds, tripPlayers } = await parent();
  const player = tripPlayers.find(p => p.id === parseInt(params.playerId));
	if (!player) throw error(404, 'Player not found');

	const courseId = rounds.find(r => r.id === parseInt(params.roundId))?.id;
	if (!courseId) throw error(500, 'Unable to load course information');

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
    .eq('id', courseId)
    .limit(1)
    .single();

	if (dbError) {
		throw error(500, { message: dbError.message });
	}

	// TODO: workaround until this is implemented: https://github.com/supabase/postgrest-js/issues/303
  type ResultRow = typeof data;
  type PatchedHoleInfo = Prettify<ArrayElement<ArrayElement<ResultRow['tee_boxes']>['hole_info']>>;
  type PatchedTeeBoxes = Prettify<Omit<ArrayElement<ResultRow['tee_boxes']>, 'hole_info'> & { 'hole_info': PatchedHoleInfo[] }>;
  type PatchedResult = Prettify<Omit<ResultRow, 'tee_boxes'> & { 'tee_boxes': PatchedTeeBoxes[] }>;

	return {
		title: `${player.name} Scorecard`,
		player,
		courseData: data as PatchedResult,
	};
}) satisfies PageLoad;
