<script lang="ts">
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { SidebarProvider } from '$lib/components/ui/sidebar';
	import { setContext } from 'svelte';

	let { children, data } = $props();

	let { settings } = data;

	setContext('settings', settings);
</script>

<SidebarProvider>
	<div class="flex min-h-screen w-screen">
		<Navbar />
		<main class="flex flex-1 bg-muted py-2 pl-4">
			<div class="flex h-full w-[100%] rounded-l-md border bg-white p-4">
				{@render children?.()}
			</div>
		</main>
	</div>
</SidebarProvider>
