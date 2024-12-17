<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Bike } from 'lucide-svelte';
	let { children } = $props();
</script>

<main class="flex min-h-screen w-full bg-background">
	<!-- Left side with image -->
	<div class="relative hidden w-1/2 lg:block" in:fade={{ duration: 700 }}>
		<div class="absolute inset-0 bg-gradient-to-r from-primary to-primary/60">
			<img src="" alt="Auth" class="h-full w-full object-cover opacity-50 mix-blend-overlay" />
		</div>
	</div>
	<div class="flex w-full items-center justify-center p-8 lg:w-1/2">
		<div class="w-full max-w-md space-y-8" in:fly={{ x: 20, duration: 1000 }}>
			<!-- Logo -->
			<div class="flex justify-center">
				<div class="rounded-full bg-primary/10 p-3">
					<Bike class="h-8 w-8 text-primary" />
				</div>
			</div>
			{@render children?.()}
		</div>
	</div>
</main>
