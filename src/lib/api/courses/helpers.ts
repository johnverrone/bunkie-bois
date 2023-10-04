import type { CreateTeeBoxRequest } from './schema';

export function transformTeeBoxRequest(request: CreateTeeBoxRequest) {
	const reducedData = Object.entries(request)
		.filter(([key]) => key.substring(0, 4) === 'hole')
		.map(([key, value]) => [key.split('-'), value] as const)
		.reduce<{
			[key: number]: { holeNumber: number; par: number; yardage: number; handicap: number };
		}>((acc, [key, value]) => {
			const [, hole, attr] = key;
			if (!hole || !attr) return acc;
			const holeNumber = parseInt(hole, 10);

			const existingHoleInfo = acc[holeNumber];
			const holeInfo = existingHoleInfo ?? {
				holeNumber,
				par: 0,
				yardage: 0,
				handicap: 0
			};

			return {
				...acc,
				[holeNumber]: {
					...holeInfo,
					[attr]: value
				}
			};
		}, {});

	return Object.values(reducedData);
}
