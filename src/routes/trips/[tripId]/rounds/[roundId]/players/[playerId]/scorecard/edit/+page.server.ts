import { makeSupabaseAPI } from '@api';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const scorecardSchema = z.object({
	playerId: z.coerce.number(),
	roundId: z.coerce.number(),
	teeBoxId: z.coerce.number(),
	courseHandicap: z.coerce.number(),
	'hole-1-score': z.coerce.number().optional(),
	'hole-2-score': z.coerce.number().optional(),
	'hole-3-score': z.coerce.number().optional(),
	'hole-4-score': z.coerce.number().optional(),
	'hole-5-score': z.coerce.number().optional(),
	'hole-6-score': z.coerce.number().optional(),
	'hole-7-score': z.coerce.number().optional(),
	'hole-8-score': z.coerce.number().optional(),
	'hole-9-score': z.coerce.number().optional(),
	'hole-10-score': z.coerce.number().optional(),
	'hole-11-score': z.coerce.number().optional(),
	'hole-12-score': z.coerce.number().optional(),
	'hole-13-score': z.coerce.number().optional(),
	'hole-14-score': z.coerce.number().optional(),
	'hole-15-score': z.coerce.number().optional(),
	'hole-16-score': z.coerce.number().optional(),
	'hole-17-score': z.coerce.number().optional(),
	'hole-18-score': z.coerce.number().optional()
});

type Scorecard = z.infer<typeof scorecardSchema>;

export const actions = {
	logScore: async (event) => {
		const { request, params } = event;
		const { session, logScore } = await makeSupabaseAPI(event);
		if (!session) return fail(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());

		let scorecard: Scorecard;
		try {
			scorecard = scorecardSchema.parse(data);
		} catch (error) {
			return fail(400, { message: 'there was an error parsing the data from the scorecard' });
		}

		const scores = transformScoreData(scorecard);
		const result = await logScore({
			playerId: scorecard.playerId,
			roundId: scorecard.roundId,
			teeBoxId: scorecard.teeBoxId,
			courseHandicap: scorecard.courseHandicap,
			scores
		});

		if (!result.ok) {
			return fail(500, { message: result.error });
		}
		throw redirect(303, `/trips/${params.tripId}/rounds/${params.roundId}`);
	}
} satisfies Actions;

function transformScoreData(scorecard: Scorecard) {
	return Object.entries(scorecard)
		.filter(([key]) => key.substring(0, 4) === 'hole')
		.map(([key, value]) => [key.split('-'), value] as const)
		.reduce((acc, [key, score]) => {
			const hole = key[1];
			if (!hole) return acc;
			return {
				...acc,
				[hole]: score
			};
		}, {} as { [key: string]: number });
}
