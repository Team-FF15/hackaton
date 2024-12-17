import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { getSettings } from '@/server/db/settings';

export const load = (async (event) => {
	if (event.locals.session === null) redirect(302, '/');
	return {
		user: event.locals.user,
		settings: await getSettings()
	};
}) satisfies LayoutServerLoad;
