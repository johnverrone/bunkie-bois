export interface Trip {
	id: string;
	name: string;
	roundIds?: string[];
}

export const trips: Trip[] = [
	{
		id: 'mb2022',
		name: 'Myrtle Beach 2022',
		roundIds: ['crown-park', 'meadowlands', 'rivers-edge']
	},
	{
		id: 'mb2023',
		name: 'Myrtle Beach 2023',
		roundIds: ['2023-1', '2023-2', '20023-3']
	}
];

export interface Round {
	id: string;
	courseName: string;
	date: Date;
	scorecardId: string;
}

export const rounds: Round[] = [
	{
		id: 'crown-park',
		courseName: 'Crown Park',
		date: new Date(2022, 9, 6),
		scorecardId: 'crown-park'
	},
	{
		id: 'meadowlands',
		courseName: 'Meadowlands',
		date: new Date(2022, 9, 7),
		scorecardId: 'meadowlands'
	},
	{
		id: 'rivers-edge',
		courseName: 'Rivers Edge',
		date: new Date(2022, 9, 8),
		scorecardId: 'rivers-edge'
	}
];
