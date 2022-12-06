import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		roundId: parseInt(params.roundId, 10)
	};
};
