import { getTotalDistanceForUser, getUserRides } from '@/server/db/ride';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fetchChartData } from '@/server/db/charts';

export const load = (async (event) => {
	const { user } = await event.parent();
	if (user === null) return redirect(302, '/');

	return {
		user,
		totalDistance: await getTotalDistanceForUser(user.id),
		rides: await getUserRides(user.id),
		charts: await fetchChartData(user.id)
	};
}) satisfies PageServerLoad;
