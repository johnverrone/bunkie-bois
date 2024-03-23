import { z } from 'zod';

export const createPlayerSchema = z.object({
	handicap: z.coerce.number(),
	name: z.string(),
	tripId: z.string().optional()
});

export type CreatePlayerRequest = z.infer<typeof createPlayerSchema>;

export const updatePlayerSchema = z.object({
	id: z.string(),
	name: z.string(),
	handicap: z.coerce.number()
});

export type UpdatePlayerRequest = z.infer<typeof updatePlayerSchema>;
