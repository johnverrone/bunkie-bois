export type Prettify<T> = {
	[Key in keyof T]: T[Key];
	// eslint-disable-next-line @typescript-eslint/ban-types
} & {};
