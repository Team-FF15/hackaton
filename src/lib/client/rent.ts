import { toast } from 'svelte-sonner';

function handleGeolocationError(error: GeolocationPositionError) {
	switch (error.code) {
		case error.PERMISSION_DENIED:
			toast.error('User denied the request for Geolocation.');
			break;
		case error.POSITION_UNAVAILABLE:
			toast.error('Location information is unavailable.');
			break;
		case error.TIMEOUT:
			toast.error('The request to get user location timed out.');
			break;
		default:
			toast.error('An unknown error occurred.');
			break;
	}
}

interface GeoLocation {
	lat: number | null;
	lon: number | null;
}

export function getGeoLocation(): Promise<GeoLocation> {
	const promise = new Promise<GeoLocation>((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
				},
				(error) => {
					handleGeolocationError(error);
					reject({ lat: null, lon: null });
				}
			);
		} else {
			reject(new Error('Geolocation is not supported by this browser.'));
		}
	});

	return promise;
}
