import { z } from 'zod';

export const createTripSchema = z.object({
	name: z.string(),
	startDate: z.coerce.date(),
	endDate: z.coerce.date()
});

export type CreateTripRequest = z.infer<typeof createTripSchema>;

export const updateTripSchema = z.object({
	id: z.string(),
	name: z.string(),
	startDate: z.string(),
	endDate: z.string()
});

export type UpdateTripRequest = z.infer<typeof updateTripSchema>;
