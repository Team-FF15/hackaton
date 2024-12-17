<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import Badge from '@/components/ui/badge/badge.svelte';
	import { LandPlot, MapPin } from 'lucide-svelte';

	interface Props {
		title: string;
		location: string;
		area: string;
		status: 'available' | 'unavailable' | 'pending';
		avatarText: string;
		avatarColor: string;
	}

	const {
		title = '',
		location = '',
		area = '',
		status = 'available',
		avatarText = '1',
		avatarColor = 'bg-orange-500'
	}: Props = $props();
</script>

<div>
	<div class="flex items-center gap-2 p-2">
		<Avatar.Root class="h-12 w-12">
			<Avatar.Fallback class={avatarColor}>{avatarText}</Avatar.Fallback>
		</Avatar.Root>
		<div class="flex flex-col">
			<p>{title}</p>
			<div class="flex gap-2">
				<div class="flex items-center">
					<MapPin size={16} class="text-muted-foreground" />
					<span class="text-sm text-muted-foreground">{location}</span>
				</div>
				<div class="flex items-center">
					<LandPlot size={16} class="text-muted-foreground" />
					<span class="text-sm text-muted-foreground">{area}</span>
				</div>
				<div class="flex items-center">
					<Badge class="text-xs">{status}</Badge>
				</div>
			</div>
		</div>
	</div>
</div>
