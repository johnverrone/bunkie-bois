import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import { computeStablefordPoints } from '@utils/golf';

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

	async function getScoresForHole(scorecardIds: number[], holeNumber: number) {
		const { data, error: dbError } = await supabaseClient
			.from('hole_scores')
			.select('*')
			.in('scorecard_id', scorecardIds)
			.eq('hole_number', holeNumber);

		if (dbError) {
			throw error(500, {
				message: dbError.message
			});
		}

		return data;
	}

	/**
	 * Get all skins for a round
	 */
	async function getSkinsForRound(roundId: number) {
		const { data: scorecardsData, error: scorecardsError } = await supabaseClient
			.from('scorecards')
			.select(`id, player_id, round_id`)
			.eq('round_id', roundId);

		if (scorecardsError) {
			throw error(500, {
				message: scorecardsError.message
			});
		}

		const scorecardIds = scorecardsData.map((s) => s.id);

		const scoresByHole = new Map<number, Awaited<ReturnType<typeof getScoresForHole>>>();

		for (let holeNumber = 1; holeNumber <= 18; holeNumber++) {
			scoresByHole.set(holeNumber, await getScoresForHole(scorecardIds, holeNumber));
		}

		const skinsMap = new Map<number, Awaited<ReturnType<typeof getScoresForHole>>[number]>();

		for (const [holeNumber, scores] of scoresByHole) {
			const minScore = scores.reduce(
				(min, curr) => (curr.score && curr.score < min ? curr.score : min),
				Number.MAX_SAFE_INTEGER
			);
			const playersWithMin = scores.filter((score) => score.score === minScore);
			if (playersWithMin.length === 1 && playersWithMin[0]) {
				skinsMap.set(holeNumber, playersWithMin[0]);
			}
		}

		const playerMap = new Map<string, number[]>();

		for (const [holeNumber, winner] of skinsMap) {
			const { data: playerData, error: playersError } = await supabaseClient
				.from('players')
				.select(`id, name`)
				.eq(
					'id',
					scorecardsData.find((scorecard) => scorecard.id === winner.scorecard_id)?.player_id
				)
				.limit(1)
				.single();

			if (playersError) {
				throw error(500, {
					message: playersError.message
				});
			}

			playerMap.set(playerData.name, [...(playerMap.get(playerData.name) ?? []), holeNumber]);
		}

		return playerMap;
	}

	return {
		getHurdlePointsForRound,
		getHurdlePoints,
		getSkinsForRound
	};
}
