<script lang="ts">
	import * as Dialog from '@/components/ui/dialog';
	import { Button } from '@/components/ui/button';
	import { rentSchema } from '@/schemas/rent';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Form from '@/components/ui/form';
	import { getContext } from 'svelte';
	import type { Setting } from '@prisma/client';

	type Props = {
		id: string;
	};

	let { id }: Props = $props();
	let open = $state(false);
	let data = defaults(zod(rentSchema));

	const form = superForm(data, {
		validators: zod(rentSchema)
	});

	const { form: formData, enhance, delayed } = form;

	let setting: Omit<Setting, 'id'> = getContext('settings');
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		<Button class="rounded-full">Rent now</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure you want to rent this bike?</Dialog.Title>
			<Dialog.Description>
				this will cost you <strong>{setting.bookingFee} points</strong> +
				<strong>{setting.hourlyRate} points</strong> per hour
			</Dialog.Description>
		</Dialog.Header>
		<form class="space-y-6" method="POST" action="?/rent" use:enhance>
			<div>
				<Button type="submit">Rent</Button>
				<Button type="button" variant="outline" onclick={() => (open = false)}>Cancel</Button>
			</div>
			<Form.Field {form} name="bikeId">
				<Form.Control>
					{#snippet children({ props })}
						<input value={id} {...props} hidden />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</form>
	</Dialog.Content>
</Dialog.Root>
