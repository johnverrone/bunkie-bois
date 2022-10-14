export interface Player {
	id: string;
	name: string;
	tripIds: string[];
	handicap: number;
}

export const players: Player[] = [
	{
		id: 'john-verrone',
		name: 'John Verrone',
		tripIds: ['mb2022'],
		handicap: 12
	},
	{
		id: 'brian-calahan',
		name: 'Brian Calahan',
		tripIds: ['mb2022'],
		handicap: 19
	},
	{
		id: 'eric-matlock',
		name: 'Eric Matlock',
		tripIds: ['mb2022'],
		handicap: 12
	},
	{
		id: 'alex-matlock',
		name: 'Alex Matlock',
		tripIds: ['mb2022'],
		handicap: 20
	}
];

export const playersById = players.reduce<{ [key: string]: Player }>(
	(acc, curr) => ({
		...acc,
		[curr.id]: curr
	}),
	{}
);
