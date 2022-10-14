export function objectValues<Obj>(obj: Obj): Obj[keyof Obj][] {
	const values = Object.values(obj) as Obj[keyof Obj][];
	return values;
}
