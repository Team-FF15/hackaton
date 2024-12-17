<script lang="ts">
	import Navbar from '$lib/components/ui/navbar/navbar.svelte';
	import { SidebarProvider } from '$lib/components/ui/sidebar';
	import Badge from '@/components/ui/badge/badge.svelte';
	import { Bell, Coins, FileDown } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { setContext } from 'svelte';

	let { children, data } = $props();

	let user = $derived(data.user);
	let settings = $derived(data.settings);

	setContext('settings', data.settings);
</script>

<SidebarProvider>
	<div class="flex max-h-screen min-h-screen w-screen">
		<Navbar username={user?.username} email={user?.email} />
		<main class="flex flex-1 bg-muted py-2 pl-4">
			<div class="flex h-full w-[100%] flex-col rounded-l-md border bg-white">
				<div class="flex w-full items-center justify-between border-b p-4">
					{#if user}
						<div class="flex items-center justify-between">
							<Badge class="text-md"><Coins size={16} class="mr-2" />{user.points} coins</Badge>
						</div>
					{/if}
					<div>
						<Button variant="outline" size="icon"><Bell size={16} /></Button>
						<Button><FileDown size={16} class="mr-1" />Export data</Button>
					</div>
				</div>
				<div class="flex-1 overflow-y-auto p-4">
					{@render children?.()}
				</div>
			</div>
		</main>
	</div>
</SidebarProvider>
