import { z } from 'zod';

export const createCourseSchema = z.object({
	name: z.string()
});

export type CreateCourseRequest = z.infer<typeof createCourseSchema>;

const holeSchema = z.object({
	par: z.coerce.number(),
	yardage: z.coerce.number(),
	handicap: z.coerce.number()
});

export const createTeeBoxSchema = z.object({
	courseId: z.string(),
	name: z.string(),
	rating: z.coerce.number(),
	slope: z.coerce.number(),
	holes: z.object({
		1: holeSchema,
		2: holeSchema,
		3: holeSchema,
		4: holeSchema,
		5: holeSchema,
		6: holeSchema,
		7: holeSchema,
		8: holeSchema,
		9: holeSchema,
		10: holeSchema,
		11: holeSchema,
		12: holeSchema,
		13: holeSchema,
		14: holeSchema,
		15: holeSchema,
		16: holeSchema,
		17: holeSchema,
		18: holeSchema
	})
});

export type CreateTeeBoxRequest = z.infer<typeof createTeeBoxSchema>;
