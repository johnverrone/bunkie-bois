import { error } from '@sveltejs/kit';
import { computeStablefordPoints } from '$lib/utils/golf';
import { pb, type HoleInfo } from '$lib/pocketbase';
import type { SendOptions } from 'pocketbase';

/**
 * Gets the total score for trip. Optionally filter by rounds.
 */
export async function getTripLeaderboard(tripId: string, roundIds?: string[], opts?: SendOptions) {
	// use custom endpoint to bulk fetch
	const f = opts?.fetch ?? fetch;
	const resp = await f(
		`${pb.baseUrl}/api/bb/getTripLeaderboard?` +
			new URLSearchParams({
				tripId,
				rounds: roundIds?.join(',') ?? ''
			})
	);
	const result = await resp.json();
	// TODO cleanup types
	return result.leaderboard as { player: string; score: { gross: number; handicap: number } }[];
}

/**
 * Get all hurdle points for a round
 */
export async function getHurdlePointsForRound(roundId: string, opts?: SendOptions) {
	const scorecards = await pb.collection('scorecards').getFullList({
		expand: 'player,round,holeScores_via_scorecard,teeBox,teeBox.holeInfo_via_teeBox',
		filter: `round.id='${roundId}'`,
		...opts
	});

	type HurdleInfo = {
		points: number;
		quota?: number;
	};

	const hurdleMap = new Map<string, HurdleInfo>();

	for (const card of scorecards) {
		const playerName = card.expand?.player?.name;
		if (!playerName) continue;

		const parMap = card.expand?.teeBox?.expand?.holeInfo_via_teeBox.reduce<Record<string, number>>(
			(acc, curr) => ({ ...acc, [curr.holeNumber]: curr.par }),
			{}
		);

		const points =
			card.expand?.holeScores_via_scorecard.reduce((acc, curr) => {
				const par = parMap?.[curr.holeNumber];
				if (!par) return acc;
				const score = curr.score;
				return acc + computeStablefordPoints(par, score);
			}, 0) ?? 0;

		hurdleMap.set(playerName, { points });
	}

	return hurdleMap;
}

/**
 * Get all skins for a round
 */
export async function getSkinsForRound(roundId: string, opts?: SendOptions) {
	const scorecards = await pb.collection('scorecards').getFullList({
		expand: 'player,round,holeScores_via_scorecard,teeBox,teeBox.holeInfo_via_teeBox',
		filter: `round.id='${roundId}'`,
		...opts
	});

	type PlayerScore = {
		player: string;
		score: number;
		netScore: number;
	};
	const dataByHole: Record<number, PlayerScore[]> = {};

	for (const card of scorecards) {
		const player = card.expand?.player;
		if (!player) continue;

		const holeInfoMap =
			card.expand?.teeBox?.expand?.holeInfo_via_teeBox.reduce<Record<string, HoleInfo>>(
				(acc, curr) => ({ ...acc, [curr.holeNumber]: curr }),
				{}
			) ?? {};

		const playerHandicap = card.playerHandicap;
		for (const hole of card.expand?.holeScores_via_scorecard ?? []) {
			const holeHandicap = holeInfoMap[hole.holeNumber]?.handicap;
			if (!holeHandicap) {
				error(500, {
					message: 'There was an error fetching hole handicaps when calculating skins.'
				});
			}

			const full18Pops = Math.floor(playerHandicap / 18);
			const extraPops = playerHandicap % 18;
			const pops = full18Pops + (holeHandicap <= extraPops ? 1 : 0);

			dataByHole[hole.holeNumber] = [
				...(dataByHole[hole.holeNumber] ?? []),
				{
					player: player.name,
					score: hole.score,
					netScore: hole.score - pops
				}
			];
		}
	}

	const skinsMap = new Map<string, PlayerScore>();
	for (const hole in dataByHole) {
		const holeData = dataByHole[hole];
		if (!holeData || !holeData[0]) return;
		const lowScore = holeData.reduce(
			(min, curr) => (curr.netScore < min.netScore ? curr : min),
			holeData[0]
		);
		const playersWithScore = holeData.filter((score) => score.netScore === lowScore.netScore);
		if (playersWithScore?.length === 1) {
			skinsMap.set(hole, lowScore);
		}
	}

	const playerMap = new Map<string, string[]>();
	for (const [hole, winner] of skinsMap) {
		playerMap.set(winner.player, [...(playerMap.get(winner.player) ?? []), hole]);
	}
	return playerMap;
}
