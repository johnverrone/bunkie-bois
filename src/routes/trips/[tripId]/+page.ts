import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (({ params }) => {
	redirect(307, `/trips/${params.tripId}/rounds`);
}) satisfies PageLoad;
