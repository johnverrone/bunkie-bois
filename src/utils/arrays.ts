export function objectValues<Obj extends Record<string, unknown>>(obj: Obj): Obj[keyof Obj][] {
	const values = Object.values(obj) as Obj[keyof Obj][];
	return values;
}

export function range(size: number, startAt = 0) {
	return [...Array(size).keys()].map((i) => i + startAt);
}
