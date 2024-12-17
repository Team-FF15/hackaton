import type { BikeWithGeoInfo } from '@/types';
import type { FetchFailure, FetchSuccess } from '.';

export async function fetchNearestBikes(
	longitude: number,
	latitude: number
): Promise<FetchSuccess<BikeWithGeoInfo[]> | FetchFailure> {
	const response = await fetch(`/api/bike?lat=${latitude}&lon=${longitude}`);

	if (!response.ok) {
		return {
			success: false,
			error: new Error('Failed to fetch nearest bikes')
		};
	} else {
		const data = await response.json();
		return {
			success: true,
			data: data.bikes
		};
	}
}
