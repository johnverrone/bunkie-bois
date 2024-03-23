import PocketBase, { RecordService } from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL;

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

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: 'trips'): RecordService<Trip>;
	collection(idOrName: 'courses'): RecordService<Course>;
	collection(idOrName: 'teeBoxes'): RecordService<TeeBox>;
	collection(idOrName: 'holeInfo'): RecordService<HoleInfo>;
}

export const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
