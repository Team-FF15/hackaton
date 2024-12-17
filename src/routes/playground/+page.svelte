<script lang="ts">
	import PropertyCard from '$lib/components/property/property-card.svelte';
	import { MapLibre, Popup, Marker } from 'svelte-maplibre';
	import { LandPlot, MapPin } from 'lucide-svelte';
	import Badge from '@/components/ui/badge/badge.svelte';

	let clickedName = $state('');
	function getRandomInt(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	const colors = [
		{ bg: 'bg-orange-500', text: 'text-black-500' },
		{ bg: 'bg-blue-500', text: 'text-black-500' },
		{ bg: 'bg-purple-500', text: 'text-black-500' },
		{ bg: 'bg-green-500', text: 'text-black-500' },
		{ bg: 'bg-red-500', text: 'text-black-500' },
		{ bg: 'bg-yellow-500', text: 'text-black-500' },
		{ bg: 'bg-pink-500', text: 'text-black-500' },
		{ bg: 'bg-cyan-500', text: 'text-black-500' }
	];

	const properties = [
		{ 
			title: 'Al-Nasr Street, 256 Apartments',
			location: "M'sila",
			area: '25.6m',
			lngLat: [4.5782230174019955, 35.73972284832018],
			status: 'available',
			avatarText: '1',
			avatarColor: colors[1].bg,
			textColor: colors[1].text
		},
		{
			title: 'Marina Bay Residence',
			location: 'Algiers',
			area: '30.2m',
			lngLat: [4.5482230174019955, 35.93972284832018],
			status: 'pending',
			avatarText: '2',
			avatarColor: colors[2].bg,
			textColor: colors[2].text
		},
		{
			title: 'Garden Heights Complex',
			location: 'Oran',
			area: '18.5m',
			lngLat: [4.5582230174019955, 35.73972284832018],
			status: 'unavailable',
			avatarText: '3',
			avatarColor: colors[3].bg,
			textColor: colors[3].text
		}
	] as const;
</script>

<div class="flex h-[100vh]">
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
		{#each properties as { title, location, area, lngLat, status, avatarText, avatarColor } (lngLat)}
			(title)}
			<Marker
				lngLat={[...lngLat]}
				onclick={() => (clickedName = title)}
				class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 {avatarColor} text-black shadow-2xl focus:outline-2 focus:outline-black"
			>
				<span>
					{avatarText}
				</span>

				<Popup openOn="hover" offset={[0, -10]}>
					<div class="flex flex-col">
						<p>{title}</p>
						<div class="flex gap-2">
							<div class="flex items-center">
								<MapPin size={16} class="text-muted-foreground" />
								<span class="text-sm text-muted-foreground">{location}</span>
							</div>
							<div class="flex items-center">
								<LandPlot size={16} class="text-muted-foreground" />
								<span class="text-sm text-muted-foreground">{area}</span>
							</div>
							<div class="flex items-center">
								<Badge class="text-xs">{status}</Badge>
							</div>
						</div>
					</div>
				</Popup>
			</Marker>
		{/each}
	</MapLibre>
</div>
