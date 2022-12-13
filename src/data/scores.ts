import { writable } from 'svelte/store';

export interface Score {
	playerId: number;
	roundId: number;
	score: number;
}

const initialScores: Score[] = [];

function createScoresStore() {
	const { subscribe, update } = writable<Score[]>(initialScores);

	const set = (playerId: number, roundId: number, score: number) =>
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
