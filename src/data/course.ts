import { objectValues } from '../utils/arrays';

export interface Scorecard {
	id: string;
	front9: Front9Scorecard;
	back9: Back9Scorecard;
}

interface Front9Scorecard {
	1: HoleInfo;
	2: HoleInfo;
	3: HoleInfo;
	4: HoleInfo;
	5: HoleInfo;
	6: HoleInfo;
	7: HoleInfo;
	8: HoleInfo;
	9: HoleInfo;
}

interface Back9Scorecard {
	10: HoleInfo;
	11: HoleInfo;
	12: HoleInfo;
	13: HoleInfo;
	14: HoleInfo;
	15: HoleInfo;
	16: HoleInfo;
	17: HoleInfo;
	18: HoleInfo;
}

interface HoleInfo {
	par: 3 | 4 | 5;
	yardage: number;
}

export const allHoles = (scorecard: Scorecard) => {
	return [...objectValues(scorecard.front9), ...objectValues(scorecard.back9)];
};

export const getPar = (scorecard: Scorecard) => {
	return allHoles(scorecard).reduce((acc, curr) => (acc += curr.par), 0);
};

export const getYardage = (scorecard: Scorecard) => {
	return allHoles(scorecard).reduce((acc, curr) => (acc += curr.yardage), 0);
};

const scorecards: Scorecard[] = [
	{
		id: 'crown-park',
		front9: {
			1: { par: 4, yardage: 350 },
			2: { par: 4, yardage: 350 },
			3: { par: 4, yardage: 350 },
			4: { par: 3, yardage: 350 },
			5: { par: 4, yardage: 350 },
			6: { par: 5, yardage: 350 },
			7: { par: 4, yardage: 350 },
			8: { par: 3, yardage: 350 },
			9: { par: 5, yardage: 350 }
		},
		back9: {
			10: { par: 4, yardage: 350 },
			11: { par: 5, yardage: 350 },
			12: { par: 4, yardage: 350 },
			13: { par: 3, yardage: 350 },
			14: { par: 4, yardage: 350 },
			15: { par: 5, yardage: 350 },
			16: { par: 4, yardage: 350 },
			17: { par: 4, yardage: 350 },
			18: { par: 3, yardage: 350 }
		}
	},
	{
		id: 'meadowlands',
		front9: {
			1: { par: 4, yardage: 350 },
			2: { par: 4, yardage: 350 },
			3: { par: 4, yardage: 350 },
			4: { par: 4, yardage: 350 },
			5: { par: 4, yardage: 350 },
			6: { par: 4, yardage: 350 },
			7: { par: 4, yardage: 350 },
			8: { par: 4, yardage: 350 },
			9: { par: 4, yardage: 350 }
		},
		back9: {
			10: { par: 4, yardage: 350 },
			11: { par: 4, yardage: 350 },
			12: { par: 4, yardage: 350 },
			13: { par: 4, yardage: 350 },
			14: { par: 4, yardage: 350 },
			15: { par: 4, yardage: 350 },
			16: { par: 4, yardage: 350 },
			17: { par: 4, yardage: 350 },
			18: { par: 4, yardage: 350 }
		}
	},
	{
		id: 'rivers-edge',
		front9: {
			1: { par: 4, yardage: 350 },
			2: { par: 4, yardage: 350 },
			3: { par: 4, yardage: 350 },
			4: { par: 4, yardage: 350 },
			5: { par: 4, yardage: 350 },
			6: { par: 4, yardage: 350 },
			7: { par: 4, yardage: 350 },
			8: { par: 4, yardage: 350 },
			9: { par: 4, yardage: 350 }
		},
		back9: {
			10: { par: 4, yardage: 350 },
			11: { par: 4, yardage: 350 },
			12: { par: 4, yardage: 350 },
			13: { par: 4, yardage: 350 },
			14: { par: 4, yardage: 350 },
			15: { par: 4, yardage: 350 },
			16: { par: 4, yardage: 350 },
			17: { par: 4, yardage: 350 },
			18: { par: 4, yardage: 350 }
		}
	}
];

export const scorecardsById = scorecards.reduce<{ [key: string]: Scorecard }>(
	(acc, curr) => ({
		...acc,
		[curr.id]: curr
	}),
	{}
);
