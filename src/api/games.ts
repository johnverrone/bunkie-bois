import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { computeStablefordPoints } from '@utils/golf';
import type { Prettify, ArrayElement } from '@utils/typeHelpers';

type HurdleInfo = {
	points: number;
	quota?: number;
};

export function gamesAPI(supabaseClient: TypedSupabaseClient) {
	/**
	 * Get hurdle points for a scorecard
	 */
	async function getHurdlePoints(scorecardId: number) {
		const { data: scorecardInfo, error: scorecardError } = await supabaseClient
			.from('scorecards')
			.select(
				`
        id,
        player_id,
        tee_box_id
      `
			)
			.eq('id', scorecardId)
			.limit(1)
			.single();

		if (scorecardError) {
			throw error(500, {
				message: scorecardError.message
			});
		}

		const { data: holeInfoRaw, error: holeError } = await supabaseClient
			.from('hole_info')
			.select(
				`
        tee_box_id,
        hole_number,
        par
      `
			)
			.eq('tee_box_id', scorecardInfo.tee_box_id);

		if (holeError) {
			throw error(500, {
				message: holeError.message
			});
		}

		const { data: scoresRaw, error: scoresError } = await supabaseClient
			.from('hole_scores')
			.select(
				`
        scorecard_id,
        hole_number,
        score
      `
			)
			.eq('scorecard_id', scorecardId);

		if (scoresError) {
			throw error(500, {
				message: scoresError.message
			});
		}

		const scores = scoresRaw.reduce<{ [key: number]: number }>(
			(acc, curr) => ({ ...acc, [curr.hole_number]: curr.score ?? Number.MAX_SAFE_INTEGER }),
			{}
		);

		const points = holeInfoRaw
			.map(({ par, hole_number }) => {
				const score = scores[hole_number];
				return computeStablefordPoints(par, score);
			})
			.reduce<number>((acc, curr) => (acc += curr), 0);

		const hurdleInfo: HurdleInfo = {
			points
		};

		return hurdleInfo;
	}

	/**
	 * Get all hurdle points for a round
	 */
	async function getHurdlePointsForRound(roundId: number) {
		const { data: scorecardsData, error: scorecardsError } = await supabaseClient
			.from('scorecards')
			.select(`id, player_id, round_id`)
			.eq('round_id', roundId);

		if (scorecardsError) {
			throw error(500, {
				message: scorecardsError.message
			});
		}

		const hurdleData = (
			await Promise.all(
				scorecardsData.map(async (scorecard) => {
					const { data: playerData, error: scorecardsError } = await supabaseClient
						.from('players')
						.select(`id, name`)
						.eq('id', scorecard.player_id)
						.limit(1)
						.single();

					if (scorecardsError) {
						throw error(500, {
							message: scorecardsError.message
						});
					}

					return { [playerData.name]: await getHurdlePoints(scorecard.id) };
				})
			)
		).reduce((acc, curr) => ({ ...acc, ...curr }), {});

		return hurdleData;
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
					id,
					player_id,
					players ( id, name ),
					round_id
				)
			`
			)
			.eq('scorecards.round_id', roundId)
			.limit(1, { foreignTable: 'scorecards.players' })
			.order('hole_number');

		if (scorecardsError) {
			throw error(500, {
				message: scorecardsError.message
			});
		}

		type ResultRow = (typeof scorecardsData)[number];
		type PatchedPlayers = Prettify<ArrayElement<ArrayElement<ResultRow['scorecards']>['players']>>;
		type PatchedScorecards = Prettify<
			Omit<ArrayElement<ResultRow['scorecards']>, 'players'> & { players: PatchedPlayers }
		>;
		type PatchedResult = Prettify<
			Omit<ResultRow, 'scorecards'> & { scorecards: PatchedScorecards }
		>;

		const patchedData = scorecardsData as unknown as PatchedResult[];

		type PlayerScore = {
			player: string;
			score: number;
		};

		const dataByHole = patchedData.reduce<Record<number, PlayerScore[]>>(
			(acc, curr) => ({
				...acc,
				[curr.hole_number]: [
					...(acc[curr.hole_number] ?? []),
					{ player: curr.scorecards.players.name, score: curr.score ?? 0 }
				]
			}),
			{}
		);

		const skinsMap = new Map<string, PlayerScore>();
		for (const hole in dataByHole) {
			const holeData = dataByHole[hole];
			if (!holeData || !holeData[0]) return;
			const lowScore = holeData.reduce(
				(min, curr) => (curr.score < min.score ? curr : min),
				holeData[0]
			);
			const playersWithScore = holeData.filter((score) => score.score === lowScore.score);
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
		getHurdlePointsForRound,
		getHurdlePoints,
		getSkinsForRound
	};
}
