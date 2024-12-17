<script lang="ts">
	import { MapPin, Navigation, Bike } from 'lucide-svelte';
	import { fade, slide } from 'svelte/transition';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Chart from '@/components/charts/chart.svelte';

	let { data } = $props();
</script>

<main class="mb-4 grid grid-cols-2 items-center justify-center gap-4 bg-white">
	<div class="">
		<Chart
			title="Daily Distance Traveled"
			subtext="A visual representation of daily distance"
			data={data.charts.distanceTraveled}
		/>
	</div>
	<div class="">
		<Chart
			title="Daily Usage Cost"
			subtext="A visual representation of daily cost"
			data={data.charts.usageCost}
		/>
	</div>
	<div class="">
		<Chart
			title="Daily Carbon Footprint"
			subtext="A visual representation of daily carbon footprint safed"
			data={data.charts.carbonFootprint}
		/>
	</div>
</main>

<Card>
	<CardHeader>
		<div class="flex items-center justify-between">
			<div>
				<CardTitle class="flex items-center gap-2">
					<Bike class="h-6 w-6" />
					Travel History
				</CardTitle>
				<CardDescription>Track your bike travel history and total distance</CardDescription>
			</div>
			<Badge variant="secondary" class="px-4 py-1 text-lg">
				{data.totalDistance._sum.distance?.toFixed(2)} m
			</Badge>
		</div>
	</CardHeader>
	<CardContent>
		<div class="space-y-4">
			{#each data.rides as record (record.id)}
				<div transition:slide class="relative pb-2 pl-6 last:pb-0">
					<!-- Timeline connector -->
					<!-- <div class="absolute bottom-0 left-[11px] top-0 w-[2px] bg-border last:hidden" /> -->

					<div class="relative rounded-lg border bg-white p-2">
						<!-- Date badge -->
						<Badge class="mb-2">{record.startedAt.toLocaleDateString()}</Badge>

						<!-- Location details -->
						<div class="space-y-2">
							<div class="flex items-center gap-2">
								<MapPin class="h-4 w-4 text-primary" />
								<span class="font-medium">{record.startedAt.toUTCString()}</span>
							</div>
							<div class="flex items-center gap-2">
								<Navigation class="h-4 w-4 text-primary" />
								<span class="font-medium">{record.endedAt.toUTCString()}</span>
							</div>
						</div>

						<!-- Distance -->
						<div class="mt-2 flex items-center gap-2 text-muted-foreground">
							<div class="mt-2 text-sm text-muted-foreground">
								Distance: {record.distance.toFixed(2)} m
							</div>
							|
							<div class="mt-2 text-sm text-muted-foreground">
								Cost: {record.totalCost.toFixed(2)} points
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
