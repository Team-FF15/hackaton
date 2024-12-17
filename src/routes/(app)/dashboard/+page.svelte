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
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import Chart from '@/components/charts/chart.svelte';
	type TravelRecord = {
		id: number;
		startLocation: string;
		endLocation: string;
		date: string;
		distance: number;
		time: string;
		cost: number;
	};

	// Travel history records
	let records: TravelRecord[] = $state([
		{
			id: 1,
			startLocation: 'Central Park',
			endLocation: 'Brooklyn Bridge',
			date: '2024-01-15',
			distance: 8.5,
			time: '2 hours',
			cost: 45
		},
		{
			id: 2,
			startLocation: 'Brooklyn Bridge',
			endLocation: 'Times Square',
			date: '2024-01-16',
			distance: 5.2,
			time: '1.5 hours',
			cost: 45
		},
		{
			id: 3,
			startLocation: 'Times Square',
			endLocation: 'Hudson River Park',
			date: '2024-01-17',
			distance: 3.3,
			time: '1 hour',
			cost: 25
		}
	]);
	// Data for the chart
	let DistanceTraveled = $state([
		{ day: 'Sunday', value: 234, unite: 'Km' },
		{ day: 'Monday', value: 278, unite: 'Km' },
		{ day: 'Tuesday', value: 189, unite: 'Km' },
		{ day: 'Wednesday', value: 389, unite: 'Km' },
		{ day: 'Thursday', value: 402, unite: 'Km' },
		{ day: 'Friday', value: 45, unite: 'Km' },
		{ day: 'Saturday', value: 435, unite: 'Km' }
	]);

	let UsageCost = $state([
		{ day: 'Sunday', value: 234.25, unite: '$' },
		{ day: 'Monday', value: 278, unite: '$' },
		{ day: 'Tuesday', value: 189, unite: '$' },
		{ day: 'Wednesday', value: 389, unite: '$' },
		{ day: 'Thursday', value: 402, unite: '$' },
		{ day: 'Friday', value: 45, unite: '$' },
		{ day: 'Saturday', value: 435, unite: '$' }
	]);
	let CrabonFootprint = $state([
		{ day: 'Sunday', value: 234.25, unite: 'Kg' },
		{ day: 'Monday', value: 278, unite: 'Kg' },
		{ day: 'Tuesday', value: 189, unite: 'Kg' },
		{ day: 'Wednesday', value: 389, unite: 'Kg' },
		{ day: 'Thursday', value: 402, unite: 'Kg' },
		{ day: 'Friday', value: 45, unite: 'Kg' },
		{ day: 'Saturday', value: 435, unite: 'Kg' }
	]);
	const totalDistance = $derived(records.reduce((sum, record) => sum + record.distance, 0));
</script>

<main class="mb-4 grid grid-cols-2 items-center justify-center gap-4 bg-white">
	<div class="">
		<Chart
			title="Daily Distance Traveled"
			subtext="A visual representation of daily distance"
			data={DistanceTraveled}
		/>
	</div>
	<div class="">
		<Chart
			title="Daily Usage Cost"
			subtext="A visual representation of daily cost"
			data={UsageCost}
		/>
	</div>
	<div class="">
		<Chart
			title="Daily Carbon Footprint"
			subtext="A visual representation of daily carbon footprint safed"
			data={CrabonFootprint}
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
				{totalDistance.toFixed(1)} km
			</Badge>
		</div>
	</CardHeader>
	<CardContent>
		<div class="space-y-4">
			{#each records as record (record.id)}
				<div transition:slide class="relative pb-2 pl-6 last:pb-0">
					<!-- Timeline connector -->
					<!-- <div class="absolute bottom-0 left-[11px] top-0 w-[2px] bg-border last:hidden" /> -->

					<div class="relative rounded-lg border bg-white p-2">
						<!-- Date badge -->
						<Badge class="mb-2">{new Date(record.date).toLocaleDateString()}</Badge>

						<!-- Location details -->
						<div class="space-y-2">
							<div class="flex items-center gap-2">
								<MapPin class="h-4 w-4 text-primary" />
								<span class="font-medium">{record.startLocation}</span>
							</div>
							<div class="flex items-center gap-2">
								<Navigation class="h-4 w-4 text-primary" />
								<span class="font-medium">{record.endLocation}</span>
							</div>
						</div>

						<!-- Distance -->
						<div class="mt-2 flex items-center gap-2 text-muted-foreground">
							<div class="mt-2 text-sm text-muted-foreground">
								Distance: {record.distance} km
							</div>
							|
							<div class="mt-2 text-sm text-muted-foreground">
								Cost: {record.cost} $
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</CardContent>
</Card>
