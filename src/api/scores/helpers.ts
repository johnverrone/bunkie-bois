import type { UpdateScorecardRequest } from './schema';

export function transformScoreData(request: UpdateScorecardRequest) {
	return Object.entries(request)
		.filter(([key]) => key.substring(0, 4) === 'hole')
		.map(([key, value]) => [key.split('-'), value] as const)
		.reduce((acc, [key, score]) => {
			const hole = key[1];
			if (!hole) return acc;
			return {
				...acc,
				[hole]: score
			};
		}, {} as { [key: string]: number });
}
