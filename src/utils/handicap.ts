export const calculateCourseHandicap = (
	handicapIndex: number,
	slopeRating: number,
	courseRating: number,
	par: number
) => {
	const ch = handicapIndex * (slopeRating / 113) + (courseRating - par);
	return Math.round(ch);
};
