import { z } from 'zod';

export const deleteScoreSchema = z.object({
	id: z.coerce.number()
});

export type DeleteScoreRequest = z.infer<typeof deleteScoreSchema>;

export const updateScorecardSchema = z.object({
	playerId: z.string(),
	roundId: z.string(),
	teeBoxId: z.string(),
	courseHandicap: z.coerce.number(),
	scores: z.object({
		1: z.coerce.number().optional(),
		2: z.coerce.number().optional(),
		3: z.coerce.number().optional(),
		4: z.coerce.number().optional(),
		5: z.coerce.number().optional(),
		6: z.coerce.number().optional(),
		7: z.coerce.number().optional(),
		8: z.coerce.number().optional(),
		9: z.coerce.number().optional(),
		10: z.coerce.number().optional(),
		11: z.coerce.number().optional(),
		12: z.coerce.number().optional(),
		13: z.coerce.number().optional(),
		14: z.coerce.number().optional(),
		15: z.coerce.number().optional(),
		16: z.coerce.number().optional(),
		17: z.coerce.number().optional(),
		18: z.coerce.number().optional()
	})
});

export type UpdateScorecardRequest = z.infer<typeof updateScorecardSchema>;
