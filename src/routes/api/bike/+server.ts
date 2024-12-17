import { getNearestBikes } from '@/server/db/bike';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const lat = event.url.searchParams.get('lat');
	const lon = event.url.searchParams.get('lon');

	if (!lat || !lon) return new Response('Missing latitude or longitude', { status: 400 });

	const latNum = parseFloat(lat);
	const lonNum = parseFloat(lon);

	if (isNaN(latNum) || isNaN(lonNum)) {
		return new Response('Invalid latitude or longitude', { status: 400 });
	}

	const bikes = await getNearestBikes(latNum, lonNum);
	return json({ bikes });
};
