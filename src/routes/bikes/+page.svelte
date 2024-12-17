<script lang="ts">
	import { fetchNearestBikes } from '@/client/bike';
	import type { BikeWithGeoInfo } from '@/types';
	import { toast } from 'svelte-sonner';

	let latitude: number | null = $state(null);
	let longitude: number | null = $state(null);
	let bikes: BikeWithGeoInfo[] = $state([]);

	$effect.pre(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					latitude = position.coords.latitude;
					longitude = position.coords.longitude;
				},
				(error) => {
					handleGeolocationError(error);
				}
			);
		} else {
			toast.error('Geolocation is not supported by this browser.');
		}
	});

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
</script>

<!-- You can use the latitude and longitude variables in your component -->
<p>Latitude: {latitude}</p>
<p>Longitude: {longitude}</p>

{#if latitude && longitude}
    {#await fetchNearestBikes(longitude, latitude)}
        loading
    {:then result} 
        {#if result.success}
            <pre>{JSON.stringify(result.data, null, 2)}</pre>
        {/if}
    {/await}
{/if}
