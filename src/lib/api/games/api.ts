import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { computeStablefordPoints } from '$lib/utils/golf';

export function gamesAPI(supabaseClient: TypedSupabaseClient) {
	/**
	 * Gets the total score for trip. Optionally filter by rounds.
	 */
	async function getTotalScoreForTrip(playerId: number, tripId: number, roundIds?: number[]) {
		const query = supabaseClient
			.from('hole_scores')
			.select(
				`
				scorecard_id,
				hole_number,
				score,
				scorecards!inner (
					player_id,
					round_id,
					player_handicap,
					rounds!inner ( id, trip_id )
				)
			`
			)
			.eq('scorecards.rounds.trip_id', tripId)
			.eq('scorecards.player_id', playerId);

		if (roundIds?.length) {
			query.in('scorecards.round_id', roundIds);
		}

		const { data, error: dbError } = await query;

		if (dbError) throw error(500, { message: 'There was an error fetching scores.' });

		let gross = 0;
		let handicap = 0;
		for (const hs of data) {
			gross += hs.score ?? 0;
			if (hs.hole_number === 1) {
				// new scorecard, add course handicap
				handicap += hs.scorecards?.player_handicap ?? 0;
			}
		}

		return { gross, handicap };
	}

	/**
	 * Get all hurdle points for a round
	 */
	async function getHurdlePointsForRound(roundId: number) {
		const { data: scorecardsData, error: scorecardsError } = await supabaseClient
			.from('hole_scores')
			.select(
				`
					scorecard_id,
					hole_number,
					score,
					scorecards!inner (
						player_id,
						tee_box_id,
						players ( id, name ),
						round_id
					)
				`
			)
			.eq('scorecards.round_id', roundId);

		if (scorecardsError) throw error(500, { message: 'There was an error fetching scores.' });

		type ScorecardInfo = {
			tee_box_id: number;
			player: string;
			hole_number: number;
			score: number;
		};

		const dataByRound: Record<number, ScorecardInfo[]> = {};
		for (const scorecard of scorecardsData) {
			const player = scorecard.scorecards?.players;
			if (scorecard.scorecards && player) {
				dataByRound[scorecard.scorecard_id] = [
					...(dataByRound[scorecard.scorecard_id] ?? []),
					{
						tee_box_id: scorecard.scorecards.tee_box_id,
						player: player.name,
						hole_number: scorecard.hole_number,
						score: scorecard.score ?? 0
					}
				];
			}
		}

		const { data: holeInfo, error: holeError } = await supabaseClient.from('hole_info').select(
			`
	      tee_box_id,
	      hole_number,
	      par
	    `
		);

		if (holeError) throw error(500, { message: 'There was an error fetching scores.' });

		const parMap = holeInfo.reduce<Record<string, number>>(
			(acc, curr) => ({ ...acc, [`${curr.tee_box_id}_${curr.hole_number}`]: curr.par }),
			{}
		);

		type HurdleInfo = {
			points: number;
			quota?: number;
		};

		const hurdleMap = new Map<string, HurdleInfo>();
		for (const scorecard in dataByRound) {
			const score = dataByRound[scorecard];
			if (!score || !score[0]) return;
			const points = score.reduce<number>((acc, curr) => {
				const teeBoxKey = `${curr.tee_box_id}_${curr.hole_number}`;
				const par = parMap[teeBoxKey] as number;
				const score = curr.score;
				return acc + computeStablefordPoints(par, score);
			}, 0);

			hurdleMap.set(score[0].player, {
				points
			});
		}

		return hurdleMap;
	}

	/**
	 * Get all skins for a round
	 */
	async function getSkinsForRound(roundId: number) {
		const { data: scorecardsData, error: scorecardsError } = await supabaseClient
			.from('hole_scores')
			.select(
				`
				scorecard_id,
				hole_number,
				score,
				scorecards!inner (
					player_id,
					player_handicap,
					players!inner ( id, name ),
					round_id,
					tee_boxes!inner ( id, hole_info!inner ( tee_box_id, hole_number, handicap ) )
				)
			`
			)
			.eq('scorecards.round_id', roundId)
			.order('hole_number');

		if (scorecardsError) {
			console.error(scorecardsError.message);
			throw error(500, { message: 'There was an error fetching skins.' });
		}

		type PlayerScore = {
			player: string;
			score: number;
			netScore: number;
		};

		const dataByHole: Record<number, PlayerScore[]> = {};
		for (const scorecard of scorecardsData) {
			const player = scorecard.scorecards?.players;
			if (player) {
				const playerHandicap = scorecard.scorecards?.player_handicap ?? 0;
				const holeHandicap = scorecard.scorecards?.tee_boxes?.hole_info.find(
					(info) => info.hole_number === scorecard.hole_number
				)?.handicap;
				if (!holeHandicap) {
					throw error(500, {
						message: 'There was an error fetching hole handicaps when calculating skins.'
					});
				}
				const full18Pops = Math.floor(playerHandicap / 18);
				const extraPops = playerHandicap % 18;
				const pops = full18Pops + (holeHandicap <= extraPops ? 1 : 0);
				dataByHole[scorecard.hole_number] = [
					...(dataByHole[scorecard.hole_number] ?? []),
					{
						player: player.name,
						score: scorecard.score ?? 0,
						netScore: (scorecard.score ?? 0) - pops
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

	return {
		getTotalScoreForTrip,
		getHurdlePointsForRound,
		getSkinsForRound
	};
}
