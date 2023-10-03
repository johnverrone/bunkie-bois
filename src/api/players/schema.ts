import { z } from 'zod';

export const createPlayerSchema = z.object({
	handicap: z.coerce.number(),
	name: z.string(),
	tripId: z.coerce.number()
});

export type CreatePlayerRequest = z.infer<typeof createPlayerSchema>;

export const updatePlayerSchema = z.object({
	playerId: z.coerce.number(),
	name: z.string(),
	handicap: z.coerce.number()
});

export type UpdatePlayerRequest = z.infer<typeof updatePlayerSchema>;

export const deletePlayerSchema = z.object({
	tripId: z.coerce.number(),
	playerId: z.coerce.number()
});

export type DeletePlayerRequest = z.infer<typeof deletePlayerSchema>;
