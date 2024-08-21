import type { HoleScore, Scorecard } from '$lib/pocketbase';

export function getScore(holeScores: HoleScore[] | undefined) {
	if (!holeScores) return 0;
	return holeScores.reduce((acc, curr) => acc + curr.score, 0);
}

export function scoresToCsv(scorecards: Scorecard[]): string {
	const header =
		'player,' +
		scorecards[0]?.expand?.holeScores_via_scorecard.map((hole) => hole.holeNumber).join(',');
	const scores = scorecards
		.map(
			(sc) =>
				sc.expand?.player?.name +
				',' +
				sc.expand?.holeScores_via_scorecard.map((hole) => hole.score).join(',')
		)
		.join('\r\n');

	return header + '\r\n' + scores;
}
