import { z } from 'zod';

export const deleteScoreSchema = z.object({
	id: z.coerce.number()
});

export type DeleteScoreRequest = z.infer<typeof deleteScoreSchema>;

export const updateScorecardSchema = z.object({
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

export type UpdateScorecardRequest = z.infer<typeof updateScorecardSchema>;
