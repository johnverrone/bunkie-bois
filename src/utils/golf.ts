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
