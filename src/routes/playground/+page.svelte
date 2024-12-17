<script lang="ts">
	import PropertyCard from '$lib/components/property/property-card.svelte';
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
	const properties = [
		{
			title: 'Al-Nasr Street, 256 Apartments',
			title: 'Al-Nasr Street, 256 Apartments',
			location: "M'sila",
			area: '25.6m',
			status: 'available',
			avatarText: '1',
			avatarColor: 'bg-orange-500'
			area: '25.6m',
			status: 'available',
			avatarText: '1',
			avatarColor: 'bg-orange-500'
		},
		{
			title: 'Marina Bay Residence',
			location: 'Algiers',
			area: '30.2m',
			status: 'pending',
			avatarText: '2',
			avatarColor: 'bg-blue-500'
			title: 'Marina Bay Residence',
			location: 'Algiers',
			area: '30.2m',
			status: 'pending',
			avatarText: '2',
			avatarColor: 'bg-blue-500'
		},
		{
			title: 'Garden Heights Complex',
			location: 'Oran',
			area: '18.5m',
			status: 'unavailable',
			avatarText: '3',
			avatarColor: 'bg-purple-500'
			title: 'Garden Heights Complex',
			location: 'Oran',
			area: '18.5m',
			status: 'unavailable',
			avatarText: '3',
			avatarColor: 'bg-purple-500'
		}
	] as const;
</script>

<div class="flex h-[calc(100vh-64px)]">
	<!-- Sidebar with property cards -->
	<div class="w-[400px] flex-shrink-0 overflow-y-auto border-r">
		<div class="flex flex-col gap-4 p-4">
			{#each properties as property}
				<PropertyCard
					title={property.title}
					location={property.location}
					area={property.area}
					status={property.status}
					avatarText={property.avatarText}
					avatarColor={property.avatarColor}
				/>
			{/each}
		</div>
	</div>

	<!-- Map placeholder with gradient -->
	<!-- <div class="flex-1 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
		
	</div> -->
	<MapLibre
		center={[4.5482230174019955, 35.73972284832018]}
		zoom={14}
		class="map flex-1"
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
</div>
