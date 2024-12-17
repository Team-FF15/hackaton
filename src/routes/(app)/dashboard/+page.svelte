<script lang="ts">
	import Chart from "@/components/charts/chart.svelte";

	// Data for the chart
	let chartData = $state([
		{ month: "Sunday", value: 234 },
		{ month: "Monday", value: 278 },
		{ month: "Tuesday", value: 189 },
		{ month: "Wednesday", value: 389 },
		{ month: "Thursday", value: 402 },
		{ month: "Friday", value: 509 },
		{ month: "Saturday", value: 435 },
	]);
</script>

<main class="flex w-full items-center justify-center bg-background p-4">
	<div class="w-full max-w-md">
		<Chart title="Monthly Revenue" subtext="A visual representation of monthly earnings" data={chartData} />
	</div>
</main>
