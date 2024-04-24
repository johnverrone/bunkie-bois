import { pb } from '$lib/pocketbase';
import type { SendOptions } from 'pocketbase';

export function createLeague(name: string, opts?: SendOptions) {
	return pb.collection('leagues').create({ name }, opts);
}

export function getLeagueById(leagueId: string, opts?: SendOptions) {
	return pb.collection('leagues').getOne(leagueId, opts);
}

export function getLeagues(opts?: SendOptions) {
	return pb.collection('leagues').getFullList(opts);
}
