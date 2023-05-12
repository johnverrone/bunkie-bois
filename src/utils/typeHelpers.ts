export type Prettify<T> = {
	[Key in keyof T]: T[Key];
	// eslint-disable-next-line @typescript-eslint/ban-types
} & {};

export type ArrayElement<T> = T extends readonly unknown[] ? T[0] : never;

export type TupleOf<T, N extends number> = N extends N
	? number extends N
		? T[]
		: _TupleOf<T, N, []>
	: never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
	? R
	: _TupleOf<T, N, [T, ...R]>;
