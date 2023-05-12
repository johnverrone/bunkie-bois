import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit';
import { error, fail } from '@sveltejs/kit';

export async function getTrips(supabaseClient: TypedSupabaseClient) {
	const { data, error: dbError } = await supabaseClient.from('trips').select();

	if (dbError) {
		throw error(500, {
			message: dbError.message
		});
	}

	return data;
}

export async function getTripById(supabaseClient: TypedSupabaseClient, tripId: string) {
	const { data, error: dbError } = await supabaseClient
		.from('trips')
		.select()
		.eq('id', tripId)
		.limit(1)
		.single();

	if (dbError) {
		throw error(500, {
			message: dbError.message
		});
	}

	return data;
}

export async function createTrip(supabaseClient: TypedSupabaseClient, name: string) {
	const { error: dbError } = await supabaseClient.from('trips').insert({ name });

	if (dbError) {
		return fail(500, {
			message: dbError.message
		});
	}
}
