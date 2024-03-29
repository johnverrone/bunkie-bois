import { z } from 'zod';

export const createRoundSchema = z.object({
	tripId: z.string(),
	courseId: z.string(),
	name: z.string(),
	date: z.coerce.date()
});

export type CreateRoundRequest = z.infer<typeof createRoundSchema>;

export const updateRoundSchema = z.object({
	id: z.string(),
	name: z.string(),
	courseId: z.string(),
	date: z.coerce.date()
});

export type UpdateRoundRequest = z.infer<typeof updateRoundSchema>;
