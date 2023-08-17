import { makeSupabaseAPI } from '@api';
import { redirect, type Actions, error, fail } from '@sveltejs/kit';
import { z } from 'zod';

const teeBoxSchema = z.object({
	courseId: z.coerce.number(),
	name: z.string(),
	rating: z.coerce.number(),
	slope: z.coerce.number(),
	'hole-1-par': z.coerce.number(),
	'hole-1-yardage': z.coerce.number(),
	'hole-1-handicap': z.coerce.number(),
	'hole-2-par': z.coerce.number(),
	'hole-2-yardage': z.coerce.number(),
	'hole-2-handicap': z.coerce.number(),
	'hole-3-par': z.coerce.number(),
	'hole-3-yardage': z.coerce.number(),
	'hole-3-handicap': z.coerce.number(),
	'hole-4-par': z.coerce.number(),
	'hole-4-yardage': z.coerce.number(),
	'hole-4-handicap': z.coerce.number(),
	'hole-5-par': z.coerce.number(),
	'hole-5-yardage': z.coerce.number(),
	'hole-5-handicap': z.coerce.number(),
	'hole-6-par': z.coerce.number(),
	'hole-6-yardage': z.coerce.number(),
	'hole-6-handicap': z.coerce.number(),
	'hole-7-par': z.coerce.number(),
	'hole-7-yardage': z.coerce.number(),
	'hole-7-handicap': z.coerce.number(),
	'hole-8-par': z.coerce.number(),
	'hole-8-yardage': z.coerce.number(),
	'hole-8-handicap': z.coerce.number(),
	'hole-9-par': z.coerce.number(),
	'hole-9-yardage': z.coerce.number(),
	'hole-9-handicap': z.coerce.number(),
	'hole-10-par': z.coerce.number(),
	'hole-10-yardage': z.coerce.number(),
	'hole-10-handicap': z.coerce.number(),
	'hole-11-par': z.coerce.number(),
	'hole-11-yardage': z.coerce.number(),
	'hole-11-handicap': z.coerce.number(),
	'hole-12-par': z.coerce.number(),
	'hole-12-yardage': z.coerce.number(),
	'hole-12-handicap': z.coerce.number(),
	'hole-13-par': z.coerce.number(),
	'hole-13-yardage': z.coerce.number(),
	'hole-13-handicap': z.coerce.number(),
	'hole-14-par': z.coerce.number(),
	'hole-14-yardage': z.coerce.number(),
	'hole-14-handicap': z.coerce.number(),
	'hole-15-par': z.coerce.number(),
	'hole-15-yardage': z.coerce.number(),
	'hole-15-handicap': z.coerce.number(),
	'hole-16-par': z.coerce.number(),
	'hole-16-yardage': z.coerce.number(),
	'hole-16-handicap': z.coerce.number(),
	'hole-17-par': z.coerce.number(),
	'hole-17-yardage': z.coerce.number(),
	'hole-17-handicap': z.coerce.number(),
	'hole-18-par': z.coerce.number(),
	'hole-18-yardage': z.coerce.number(),
	'hole-18-handicap': z.coerce.number()
});

type TeeBox = z.infer<typeof teeBoxSchema>;

export const actions = {
	createTeeBox: async (event) => {
		const { request } = event;
		const { session, createTeeBox } = await makeSupabaseAPI(event);
		if (!session) throw error(403, { message: 'Unauthorized' });

		const data = Object.fromEntries(await request.formData());

		try {
			const teeBox = teeBoxSchema.parse(data);
			const holeData = transformHoleData(teeBox);
			const result = await createTeeBox(
				teeBox.courseId,
				{ name: teeBox.name, rating: teeBox.rating, slope: teeBox.slope },
				holeData
			);
			if (result.error) {
				return fail(500, { message: result.error });
			}
		} catch (error) {
			return fail(400, { message: 'invalid tee box information' });
		}
		throw redirect(303, `/courses/${event.params.courseId}`);
	}
} satisfies Actions;

function transformHoleData(teeBox: TeeBox) {
	const reducedData = Object.entries(teeBox)
		.filter(([key]) => key.substring(0, 4) === 'hole')
		.map(([key, value]) => [key.split('-'), value] as const)
		.reduce<{
			[key: number]: { holeNumber: number; par: number; yardage: number; handicap: number };
		}>((acc, [key, value]) => {
			const [, hole, attr] = key;
			if (!hole || !attr) return acc;
			const holeNumber = parseInt(hole, 10);

			const existingHoleInfo = acc[holeNumber];
			const holeInfo = existingHoleInfo ?? {
				holeNumber,
				par: 0,
				yardage: 0,
				handicap: 0
			};

			return {
				...acc,
				[holeNumber]: {
					...holeInfo,
					[attr]: value
				}
			};
		}, {});

	return Object.values(reducedData);
}
