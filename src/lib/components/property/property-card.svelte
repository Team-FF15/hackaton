<script lang="ts">
	import * as Avatar from '@/components/ui/avatar/index.js';
	import Badge from '@/components/ui/badge/badge.svelte';
	import { getAvatarColor, getAvatarText } from '@/index';
	import type { BikeWithGeoInfo } from '@/types';
	import { LandPlot } from 'lucide-svelte';
	import RentDialog from '@/components/rent/rent-dialog.svelte';

	type Props = Omit<BikeWithGeoInfo, 'latitude' | 'longitude'> & { index: number };

	const { streetName, distance, status, index, id }: Props = $props();

	const avatarColor = getAvatarColor(index);
	const avatarText = getAvatarText(index);
</script>

<div>
	<div class="flex items-center justify-between gap-3 p-2">
		<div class="flex items-center justify-between gap-3">
			<Avatar.Root class="h-12 w-12">
				<Avatar.Fallback class={avatarColor}>{avatarText}</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col">
				<p>{streetName}</p>
				<div class="flex gap-2">
					<div class="flex items-center gap-1">
						<LandPlot size={16} class="text-muted-foreground" />
						<span class="text-sm text-muted-foreground">{distance.toFixed(2)}</span>
					</div>
					<div class="flex items-center">
						<Badge class="text-xs" variant="secondary">{status}</Badge>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full">
			<RentDialog {id} />
		</div>
	</div>
</div>
