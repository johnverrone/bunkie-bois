export type ResultType<T> =
	| {
			ok: true;
			data: T;
	  }
	| {
			ok: false;
			error: string;
	  };

export const Result = {
	ok: <T>(data: T): ResultType<T> => ({ ok: true, data }),
	error: (error: string): ResultType<never> => ({ ok: false, error })
};
