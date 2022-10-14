import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export function load({ params }: PageLoad) {
	throw redirect(307, `/${params.tripId}/rounds`);
}
