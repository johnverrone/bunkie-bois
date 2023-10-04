export const calculateCourseHandicap = (
	handicapIndex: number | null,
	slopeRating: number,
	courseRating: number,
	par: number
) => {
	if (handicapIndex === null) return 0;
	const ch = handicapIndex * (slopeRating / 113) + (courseRating - par);
	return Math.round(ch);
};
