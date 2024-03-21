import PocketBase, { RecordService } from 'pocketbase';

const POCKETBASE_URL = import.meta.env.VITE_POCKETBASE_URL;

export interface Trip {
	id: string;
	name: string;
	startDate: string;
	endDate: string;
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: 'trips'): RecordService<Trip>;
}

export const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
