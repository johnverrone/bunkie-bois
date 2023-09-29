import type { LayoutLoad } from './$types';
import { makeSupabaseAPI } from '@api';

export const load = (async (event) => {
	const { session, getUserRole } = await makeSupabaseAPI(event);
	const role = session ? await getUserRole(session?.user.id ?? '') : '';

	return {
		session,
		role: {
			isAdmin: () => role === 'admin'
		}
	};
}) satisfies LayoutLoad;
