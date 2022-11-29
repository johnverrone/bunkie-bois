import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	throw redirect(307, `/${params.tripId}/rounds`);
};
