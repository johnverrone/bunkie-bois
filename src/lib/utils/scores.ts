import type { HoleScore } from '$lib/pocketbase';

export function getScore(holeScores: HoleScore[] | undefined) {
	if (!holeScores) return 0;
	return holeScores.reduce((acc, curr) => acc + curr.score, 0);
}
