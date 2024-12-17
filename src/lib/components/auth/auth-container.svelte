<script lang="ts">
	import { Bike } from 'lucide-svelte';
	export let title: string;
	export let subtitle: string;
</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-md">
		<!-- You can add your logo here -->
		<div class="flex justify-center">
			<div class="rounded-full bg-primary/10 p-3">
				<Bike class="h-8 w-8 text-primary" />
			</div>
		</div>
		<h2 class="mt-6 text-center text-3xl font-bold tracking-tight">
			{title}
		</h2>
		<p class="mt-2 text-center text-sm text-muted-foreground">
			{subtitle}
		</p>
	</div>

	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
			<slot />
		</div>
	</div>
</div>
