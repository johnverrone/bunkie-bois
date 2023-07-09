const GOLF_COURSES = [
	'Whistling Straits',
	'Pinehurst No. 2',
	'Pebble Beach',
	'Erin Hills',
	'The Ocean Course',
	'Paynes Valley',
	'Augusta National',
	'The Old Course',
	'Royal County Down',
	'TPC Sawgrass',
	'Carnoustie',
	'Bethpage Black',
	'Pacific Dunes',
	'Cypress Point',
	'Congressional',
	'Bandon Dunes'
] as const;

export function randomGolfCourse(): string {
	return GOLF_COURSES[Math.floor(Math.random() * GOLF_COURSES.length)] ?? GOLF_COURSES[0];
}

export function computeStablefordPoints(par: number, score: number | undefined) {
	if (!score) return 0;
	if (par - score === 2) return 8; // eagle
	if (par - score === 1) return 4; // birdie
	if (par - score === 0) return 2; // par
	if (par - score === -1) return 1; // bogey
	return 0; // double or worse
}
