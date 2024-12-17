<script lang="ts">
	import PropertyCard from '@/components/property/property-card.svelte';
	import { MapLibre, Popup, Marker } from 'svelte-maplibre';
	import { LandPlot } from 'lucide-svelte';
	import { getAvatarColor, getAvatarText } from '@/index';
	import Badge from '@/components/ui/badge/badge.svelte';
	import { getGeoLocation } from '@/client/rent';
	import { fetchNearestBikes } from '@/client/bike';
	import { toast } from 'svelte-sonner';
	import type { BikeWithGeoInfo } from '@/types';

	let myLocation: { lat: number | null; lon: number | null } = $state({
		lat: null,
		lon: null
	});

	let bikesNearBy: BikeWithGeoInfo[] = $state([]);
	let loading = $state(false);

	async function getLatLon() {
		myLocation = await getGeoLocation();
	}

	$effect.pre(() => {
		getLatLon();
	});

	async function nearestBikes() {
		if (myLocation.lat && myLocation.lon) {
			loading = true;
			const result = await fetchNearestBikes(myLocation.lon, myLocation.lat);
			loading = false;
			if (result.success) {
				bikesNearBy = result.data;
			} else {
				bikesNearBy = [];
				toast.error('Failed to fetch nearest bikes');
			}
		}
	}

	$effect(() => {
		nearestBikes();
	});
</script>

<div class="flex h-[90vh] w-full">
	<!-- Sidebar with property cards -->
	<div class="w-[400px] flex-shrink-0 overflow-y-auto border-r">
		<div class="flex flex-col gap-4 p-4">
			{#if loading}
				<p>Loading...</p>
			{:else}
				{#each bikesNearBy as bike, i}
					<PropertyCard
						id={bike.id}
						streetName={bike.streetName}
						distance={bike.distance}
						status={bike.status}
						index={i}
					/>
				{/each}
			{/if}
		</div>
	</div>

	<!-- Map placeholder with gradient -->
	<!-- <div class="flex-1 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
	  
	</div> -->
	{#if myLocation.lat && myLocation.lon}
		<MapLibre
			center={[myLocation.lon, myLocation.lat]}
			zoom={14}
			class="map flex-1"
			standardControls
			style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
		>
			{#each bikesNearBy as bike, i (bike.id)}
				{@const avatarColor = getAvatarColor(i)}
				{@const avatarText = getAvatarText(i)}
				<Marker
					lngLat={[bike.latitude, bike.longitude]}
					class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 {avatarColor} text-black shadow-2xl focus:outline-2 focus:outline-black"
				>
					<span>
						{avatarText}
					</span>

					<Popup openOn="hover" offset={[0, -10]}>
						<div class="flex flex-col">
							<p>{bike.streetName}</p>
							<div class="flex gap-2">
								<div class="flex items-center">
									<LandPlot size={16} class="text-muted-foreground" />
									<span class="text-sm text-muted-foreground">{bike.distance.toFixed(2)}</span>
								</div>
								<div class="flex items-center">
									<Badge class="text-xs">{bike.status}</Badge>
								</div>
							</div>
						</div>
					</Popup>
				</Marker>
			{/each}
		</MapLibre>
	{/if}
</div>
