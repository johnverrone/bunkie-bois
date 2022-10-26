import { derived, writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export interface Player {
	id: string;
	name: string;
	tripIds: string[];
	handicap: number;
}

export const initialPlayers: Player[] = [
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

function createPlayersStore() {
	const { subscribe, update } = writable<Player[]>(initialPlayers);

	const add = (name: string, handicap: number) => {
		console.log('updating players store');
		update((players) => [...players, { id: uuidv4(), name, tripIds: ['mb2022'], handicap }]);
	};

	return {
		subscribe,
		add
	};
}

export const players = createPlayersStore();

export const playersById = derived(players, ($players) =>
	$players.reduce<{ [key: string]: Player }>(
		(acc, curr) => ({
			...acc,
			[curr.id]: curr
		}),
		{}
	)
);
