import { prisma } from '.';
import { env } from '$env/dynamic/private';
import type { BikeWithGeoInfo } from '@/types';

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	const toRad = (value: number) => (value * Math.PI) / 180;
	const R = 6371;
	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}

interface NominatimResponse {
	display_name: string;
	address: Record<string, string>;
}

export async function getStreetName(lon: number, lat: number): Promise<string | null> {
	const cacheKey = `${lat},${lon}`;

	// Check the database cache first
	const cachedStreet = await prisma.streetCache.findUnique({
		where: { location: cacheKey },
		select: { street: true }
	});

	if (cachedStreet) {
		return cachedStreet.street;
	}

	const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

	const response = await fetch(url, {
		headers: {
			'User-Agent': `Mozilla/5.0 (compatible; HackatonApp/1.0; +${env.ORIGIN})`
		}
	});

	if (!response.ok) {
		return null;
	}

	const data: NominatimResponse = await response.json();

	const streetName = data && data.display_name ? data.display_name.split(',')[0] : null;

	// Store the result in the database cache
	if (streetName) {
		await prisma.streetCache.create({
			data: {
				location: cacheKey,
				street: streetName
			}
		});
	}

	return streetName;
}

export async function getNearestBikes(
	longitude: number,
	latitude: number
): Promise<BikeWithGeoInfo[]> {
	const bikes = await prisma.bike.findMany({
		orderBy: {
			status: 'asc'
		},
		take: 10
	});

	const bikesWithGeoInfo = await Promise.all(
		bikes.map(async (bike) => {
			const distance = haversineDistance(latitude, longitude, bike.latitude, bike.longitude);
			const streetName = await getStreetName(bike.latitude, bike.longitude);
			return {
				...bike,
				distance,
				streetName
			};
		})
	);

	console.log(bikesWithGeoInfo);
	bikesWithGeoInfo.sort((a, b) => a.distance - b.distance);

	return bikesWithGeoInfo;
}
