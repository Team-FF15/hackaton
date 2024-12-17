import type { PageServerLoad } from './$types';

export const load = (async (event) => {
	const { user } = await event.parent();
	return {
		user
	};
}) satisfies PageServerLoad;
