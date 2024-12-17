<script lang="ts">
	import { slide } from 'svelte/transition';
	import { ArrowUpIcon } from 'lucide-svelte';

	// Props for the component
	let {
		title = 'Chart Title',
		subtext = '',
		data = []
	}: {
		title: string;
		subtext: string;
		data: Array<{ day: string; value: number; unite?: string }>;
	} = $props();

	// Calculate the maximum value for scaling
	const maxValue = $derived(Math.max(...data.map((d) => d.value)));

	// Calculate percentage for current day compared to previous
	const growth = $derived(
		data.length < 2
			? 0
			: ((data[data.length - 1].value - data[data.length - 2].value) /
					data[data.length - 2].value) *
					100
	);

	// Format numbers with K suffix
	const formatValue = (value: number) => {
		return value >= 1000 ? `${(value / 1000).toFixed(1)}K` : value;
	};
</script>

<div class="w-full rounded-lg border bg-card p-6 shadow-sm" transition:slide>
	<!-- Header -->
	<div class="flex flex-col space-y-1.5">
		<h3 class="text-xl font-semibold leading-none tracking-tight">{title}</h3>
		{#if subtext}
			<p class="text-sm text-muted-foreground">{subtext}</p>
		{/if}
	</div>

	<!-- Growth Indicator -->
	<div class="mt-4 flex items-center gap-2">
		<span class="text-2xl font-bold">
			{formatValue(data[data.length - 1]?.value || 0)}
		</span>
		{#if growth !== 0}
			<span class={`flex items-center text-sm ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
				<ArrowUpIcon class={`h-4 w-4 ${growth < 0 ? 'rotate-180' : ''}`} />
				{Math.abs(growth).toFixed(1)}%
			</span>
		{/if}
	</div>

	<!-- Chart -->
	<div class="mt-4 h-[200px] w-full">
		<div class="flex h-full items-end justify-between gap-2">
			{#each data as item}
				<div class="group flex w-full flex-col items-center gap-2">
					<div class="relative w-full">
						<!-- Tooltip -->
						<div
							class="absolute bottom-full left-1/2 mb-2 hidden w-max -translate-x-1/2 transform rounded bg-foreground px-2 py-1 text-xs text-background group-hover:block"
						>
							{formatValue(item.value)}
							{item.unite}
						</div>
						<!-- Bar -->
						<div
							class="w-full rounded-t bg-primary/80 transition-all duration-300 ease-in-out group-hover:bg-primary"
							style:height="{(item.value / maxValue) * 180}px"
						/>
					</div>
					<span class="text-xs text-muted-foreground">{item.day}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
