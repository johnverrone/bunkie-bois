export type ResultType<T> =
	| {
			ok: true;
			data: T;
	  }
	| {
			ok: false;
			status: number;
			error: string;
	  };

export const Result = {
	ok: <T>(data: T): ResultType<T> => ({ ok: true, data }),
	error: (status: number, error: string): ResultType<never> => ({ ok: false, status, error })
};
