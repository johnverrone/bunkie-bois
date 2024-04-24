import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (({ params }) => {
	redirect(307, `/leagues/${params.leagueId}/standings`);
}) satisfies PageLoad;
