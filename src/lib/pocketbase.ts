import PocketBase, { RecordService } from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

export interface SystemProps {
	id: string;
	created: string;
	updated: string;
}

export interface Trip extends SystemProps {
	name: string;
	startDate: string;
	endDate: string;
}

export interface TeeBox extends SystemProps {
	name: string;
	rating: number;
	slope: number;
	expand?: {
		holeInfo_via_teeBox: HoleInfo[];
	};
}

export interface Course extends SystemProps {
	id: string;
	name: string;
	expand?: {
		teeBoxes_via_course: TeeBox[];
	};
}

export interface HoleInfo extends SystemProps {
	teeBox: TeeBox;
	holeNumber: number;
	par: number;
	yardage: number;
	handicap: number;
}

export interface Player extends SystemProps {
	name: string;
	handicap: number;
	trips: Trip[];
}

export interface Round extends SystemProps {
	name: string;
	date: string;
	expand?: {
		trip?: Trip;
		course?: Course;
	};
}

export interface HoleScore extends SystemProps {
	holeNumber: number;
	score: number;
}

export interface Scorecard extends SystemProps {
	playerHandicap: number;
	expand?: {
		player?: Player;
		round?: Round;
		teeBox?: TeeBox;
		holeScores_via_scorecard: HoleScore[];
	};
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: 'trips'): RecordService<Trip>;
	collection(idOrName: 'courses'): RecordService<Course>;
	collection(idOrName: 'teeBoxes'): RecordService<TeeBox>;
	collection(idOrName: 'holeInfo'): RecordService<HoleInfo>;
	collection(idOrName: 'players'): RecordService<Player>;
	collection(idOrName: 'rounds'): RecordService<Round>;
	collection(idOrName: 'scorecards'): RecordService<Scorecard>;
	collection(idOrName: 'holeScore'): RecordService<HoleScore>;
}

export const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
