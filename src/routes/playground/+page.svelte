<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Badge from '@/components/ui/badge/badge.svelte';
	import { LandPlot, MapPin } from 'lucide-svelte';
	import PropertyCard from '$lib/components/property/property-card.svelte';

	const properties = [
		{
			title: "Al-Nasr Street, 256 Apartments",
			location: "M'sila",
			area: "25.6m",
			status: "available",
			avatarText: "1",
			avatarColor: "bg-orange-500"
		},
		{
			title: "Marina Bay Residence",
			location: "Algiers",
			area: "30.2m",
			status: "pending",
			avatarText: "2",
			avatarColor: "bg-blue-500"
		},
		{
			title: "Garden Heights Complex",
			location: "Oran",
			area: "18.5m",
			status: "unavailable",
			avatarText: "3",
			avatarColor: "bg-purple-500"
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
	<div class="flex-1 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
	</div>
</div>
