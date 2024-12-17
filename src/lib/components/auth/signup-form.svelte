<script lang="ts">
	import { fade } from 'svelte/transition';
	import * as Form from '@/components/ui/form';
	import { Input } from '@/components/ui/input';
	import { Button } from '@/components/ui/button';
	import { Checkbox } from '@/components/ui/checkbox';
	import { Label } from '@/components/ui/label';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerSchema } from '@/schemas/auth';

	interface Props {
		data: SuperValidated<Infer<typeof registerSchema>>;
	}

	let { data }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(registerSchema)
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

		<!-- Email input -->
		<Form.Field {form} name="email" class="space-y-2">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Email</Form.Label>
					<Input type="email" {...props} bind:value={$formData.email} />
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

		<!-- Confirm Password input -->
		<Form.Field {form} name="confirmPassword" class="space-y-2">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Confirm Password</Form.Label>
					<Input type="password" {...props} bind:value={$formData.confirmPassword} />
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Terms and Conditions -->
	<div class="flex items-center gap-2">
		<Form.Field {form} name="terms" class="space-y-2">
			<Form.Control>
				{#snippet children({ props })}
					<Checkbox {...props} bind:checked={$formData.terms} />
					<Label
						for="terms"
						class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						I agree to the <a href="/terms" class="text-primary hover:underline"
							>Terms and Conditions</a
						>
					</Label>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	</div>

	<!-- Submit button -->
	<Button type="submit" class="w-full" disabled={!$formData.terms || $delayed}>
		{#if !delayed}
			<span transition:fade>Loading...</span>
		{:else}
			Sign up
		{/if}
	</Button>

	<!-- Sign in link -->
	<p class="mt-2 text-center text-sm text-muted-foreground">
		Already have an account?
		<a href="/login" class="font-medium text-primary hover:underline"> Sign in </a>
	</p>
</form>
