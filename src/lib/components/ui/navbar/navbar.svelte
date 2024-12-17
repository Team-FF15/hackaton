<!-- Sidebar.svelte -->
<script lang="ts">
	import { Avatar, AvatarFallback } from '$lib/components/ui/avatar';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Bike, Settings, LogOut, LayoutDashboard, FileText } from 'lucide-svelte';

	let { username, email } = $props();
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<div class="flex h-full flex-col bg-muted">
			<!-- Logo -->
			<div class="flex items-center gap-2 px-4 py-4">
				<Bike class="h-6 w-6" />
				<span class="text-xl font-bold">FFBIKES</span>
			</div>

			<!-- Navigation -->
			<nav class="flex-1 space-y-1 px-2 py-4">
				<a
					href="/dashboard"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
				>
					<LayoutDashboard class="h-4 w-4" />
					Dashboard
				</a>
				<a
					href="/rent"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
				>
					<Bike class="h-4 w-4" />
					Rent a Bike
				</a>
				<a
					href="/tickets"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
				>
					<FileText class="h-4 w-4" />
					Tickets
				</a>
			</nav>

			<!-- User section -->
			<div class="space-y-2 p-4">
				<!-- Settings Link -->
				<a
					href="/settings"
					class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
				>
					<Settings class="h-4 w-4" />
					Settings
				</a>
				<div class="flex items-center gap-3">
					<Avatar>
						<AvatarFallback class="bg-orange-500 text-white">{username.charAt(0)}</AvatarFallback>
					</Avatar>
					<div class="flex-1 text-sm">
						<p class="font-medium">{username}</p>
						<p class="text-muted-foreground">{email}</p>
					</div>
					<a
						href="/logout"
						class="flex h-8 w-8 items-center justify-center rounded-lg text-red-500 transition-colors hover:bg-red-100"
					>
						<LogOut class="h-4 w-4" />
					</a>
				</div>
			</div>
		</div>
	</Sidebar.Content>
</Sidebar.Root>
