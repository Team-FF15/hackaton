import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	if (event.locals.session !== null) redirect(302, '/dashboard');
	return {};
}) satisfies PageServerLoad;
