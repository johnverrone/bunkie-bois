import type { PageLoad } from './$types';

export function load({ params }: PageLoad) {
	return { id: params.id };
}
