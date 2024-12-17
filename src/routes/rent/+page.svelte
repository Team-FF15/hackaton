<script lang="ts">
	import { MapLibre, Popup, Marker } from 'svelte-maplibre';
	let clickedName = $state('');

	const markers: Array<{
		lngLat: [number, number];
		label: string;
		name: string;
	}> = [
		{
			lngLat: [4.5, 35.7],
			label: 'SEA',
			name: 'Seattle'
		},
		{
			lngLat: [-159.3438, 21.9788],
			label: 'LIH',
			name: 'Lihue'
		},
		{
			lngLat: [2.5479, 49.0097],
			label: 'CDG',
			name: 'Paris Charles de Gaulle'
		},
		{
			lngLat: [-58.5348, -34.82],
			label: 'EZE',
			name: 'Ministro Pistarini'
		},
		{
			lngLat: [18.6021, -33.9715],
			label: 'CPT',
			name: 'Cape Town'
		},
		{
			lngLat: [121.0165, 14.5123],
			label: 'MNL',
			name: 'Ninoy Aquino'
		}
	];
</script>

<MapLibre
	center={[4.5482230174019955, 35.73972284832018]}
	zoom={14}
	class="map"
	standardControls
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
>
	{#each markers as { lngLat, label, name } (label)}
		<Marker
			{lngLat}
			onclick={() => (clickedName = name)}
			class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-red-300 text-black shadow-2xl focus:outline-2 focus:outline-black"
		>
			<span>
				{label}
			</span>

			<Popup openOn="hover" offset={[0, -10]}>
				<div class="text-lg font-bold text-black">{name}</div>
			</Popup>
		</Marker>
	{/each}
</MapLibre>

<style>
	:global(.map) {
		height: 300px;
		width: 600px;
	}
</style>
