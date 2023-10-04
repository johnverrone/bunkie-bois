import { z } from 'zod';

export const createRoundSchema = z.object({
	tripId: z.coerce.number(),
	courseId: z.coerce.number(),
	name: z.string(),
	date: z.coerce.date()
});

export type CreateRoundRequest = z.infer<typeof createRoundSchema>;

export const deleteRoundSchema = z.object({
	roundId: z.coerce.number()
});

export type DeleteRoundRequest = z.infer<typeof deleteRoundSchema>;

export const updateRoundSchema = z.object({
	id: z.coerce.number(),
	name: z.string(),
	courseId: z.coerce.number(),
	date: z.coerce.date()
});

export type UpdateRoundRequest = z.infer<typeof updateRoundSchema>;
