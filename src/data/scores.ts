import { writable } from 'svelte/store';

export interface Score {
	playerId: string;
	roundId: string;
	score: number;
}

const initialScores: Score[] = [
	{
		playerId: 'john-verrone',
		roundId: 'crown-park',
		score: 90
	},
	{
		playerId: 'eric-matlock',
		roundId: 'crown-park',
		score: 88
	}
];

function createScoresStore() {
	const { subscribe, update } = writable<Score[]>(initialScores);

	const set = (playerId: string, roundId: string, score: number) =>
		update((scores) => {
			const existingScoreIndex = scores.findIndex(
				(s) => s.playerId === playerId && s.roundId === roundId
			);
			const newScores = [...scores];
			if (existingScoreIndex >= 0) {
				newScores.splice(existingScoreIndex, 1, { playerId, roundId, score });
				return newScores;
			}
			return [...newScores, { playerId, roundId, score }];
		});

	return {
		subscribe,
		set
	};
}

export const scores = createScoresStore();
