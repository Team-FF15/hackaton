<script lang="ts">
	import { fade } from 'svelte/transition';
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema } from '@/schemas/auth';

	interface Props {
		data: SuperValidated<Infer<typeof loginSchema>>;
	}

	let { data }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, enhance, delayed } = form;
</script>

<form class="mt-8 space-y-6" method="POST" use:enhance>
	<div class="space-y-4 rounded-md shadow-sm">
		<!-- User Name input -->
		<Form.Field {form} name="username" class="space-y-2">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Username</Form.Label>
					<Input {...props} bind:value={$formData.username} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<!-- Password input -->
		<Form.Field {form} name="password" class="space-y-2">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Password</Form.Label>
					<Input type="password" {...props} bind:value={$formData.password} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Submit button -->
	<Button type="submit" class="w-full" disabled={$delayed}>
		{#if !delayed}
			<span transition:fade>Loading...</span>
		{:else}
			Sign in
		{/if}
	</Button>

	<!-- Sign in link -->
	<p class="mt-2 text-center text-sm text-muted-foreground">
		Don't have an account?
		<a href="/signup" class="font-medium text-primary hover:underline"> Sign up </a>
	</p>
</form>
