<script lang="ts">
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { resetEmailSchema, resetPasswordSchema, resetUsernameSchema } from '@/schemas/auth.js';
	import { Button } from '$lib/components/ui/form';
	import { fade } from 'svelte/transition';
	import { Input } from '@/components/ui/input/index.js';

	let { data } = $props();

	let usernameForm = superForm(data.form.username, {
		validators: zod(resetUsernameSchema)
	});
	let emailForm = superForm(data.form.email, {
		validators: zod(resetEmailSchema)
	});
	let passwordForm = superForm(data.form.password, {
		validators: zod(resetPasswordSchema)
	});

	const { form: userFormData, enhance: userEnhance, delayed: userDelayed } = usernameForm;
	const { form: emailFormData, enhance: emailEnhance, delayed: emailDelayed } = emailForm;
	const {
		form: passwordFormData,
		enhance: passwordEnhance,
		delayed: passwordDelayed
	} = passwordForm;
</script>

<Card class="mx-auto w-full">
	<CardHeader>
		<CardTitle>Profile Settings</CardTitle>
		<CardDescription>Manage your account settings and change your credentials</CardDescription>
	</CardHeader>

	<CardContent>
		<!-- Change Username Form -->
		<form method="POST" action="?/username" use:userEnhance>
			<Form.Field form={usernameForm} name="username" class="space-y-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$userFormData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Button type="submit" disabled={$userDelayed}>
				{#if !userDelayed}
					<span transition:fade>Loading...</span>
				{:else}
					Update Username
				{/if}
			</Button>
		</form>

		<!-- Change Email Form -->
		<form method="POST" action="?/email" use:emailEnhance>
			<Form.Field form={emailForm} name="email" class="space-y-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$emailFormData.email} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Button type="submit" disabled={$emailDelayed}>
				{#if !emailDelayed}
					<span transition:fade>Loading...</span>
				{:else}
					Update Email
				{/if}
			</Button>
		</form>

		<!-- Change Password Form -->
		<form method="POST" action="?/password" use:passwordEnhance>
			<Form.Field form={passwordForm} name="currentPassword" class="space-y-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Current Password</Form.Label>
						<Input type="password" {...props} bind:value={$passwordFormData.currentPassword} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field form={passwordForm} name="password" class="space-y-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>New Password</Form.Label>
						<Input type="password" {...props} bind:value={$passwordFormData.password} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field form={passwordForm} name="confirmPassword" class="space-y-2">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Confirm new Password</Form.Label>
						<Input type="password" {...props} bind:value={$passwordFormData.confirmPassword} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Button type="submit" disabled={$passwordDelayed}>
				{#if !passwordDelayed}
					<span transition:fade>Loading...</span>
				{:else}
					Update Password
				{/if}
			</Button>
		</form>
	</CardContent>
</Card>
