<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardDescription
	} from '$lib/components/ui/card';
	import { Alert, AlertDescription } from '$lib/components/ui/alert';

	// Form data state
	let formData = $state({
		username: 'johnsmith',
		email: 'john.smith@example.com',
		currentPassword: '',
		newPassword: '',
		confirmPassword: ''
	});

	// UI states
	let showPassword = $state(false);
	let showNewPassword = $state(false);
	let showConfirmPassword = $state(false);
	let successMessage = $state('');
	let errorMessage = $state('');

	/** Toggle password visibility */
	const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
		if (field === 'current') showPassword = !showPassword;
		if (field === 'new') showNewPassword = !showNewPassword;
		if (field === 'confirm') showConfirmPassword = !showConfirmPassword;
	};

	/** Handle form submission */
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		// Basic validation
		if (formData.newPassword !== formData.confirmPassword) {
			errorMessage = "Passwords don't match!";
			setTimeout(() => (errorMessage = ''), 3000);
			return;
		}

		// Simulate API call
		successMessage = 'Profile updated successfully!';
		setTimeout(() => (successMessage = ''), 3000);
	};
</script>

<Card class="mx-auto w-full">
	<CardHeader>
		<CardTitle>Profile Settings</CardTitle>
		<CardDescription>Manage your account settings and change your credentials</CardDescription>
	</CardHeader>

	<CardContent>
		<!-- Alert Messages -->
		{#if successMessage}
			<div transition:fade>
				<Alert variant="default" class="mb-6">
					<AlertDescription>{successMessage}</AlertDescription>
				</Alert>
			</div>
		{/if}

		{#if errorMessage}
			<div transition:fade>
				<Alert variant="destructive" class="mb-6">
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			</div>
		{/if}

		<!-- Settings Form -->
		<form class="space-y-6" onsubmit={handleSubmit}>
			<!-- Username Field -->
			<div class="space-y-2">
				<Label for="username">Username</Label>
				<div class="flex gap-2">
					<Input id="username" type="text" class="flex-2" bind:value={formData.username} />
					<Button type="submit" class="flex-1 ">Save</Button>
				</div>
			</div>

			<!-- Email Field -->
			<div class="space-y-2">
				<Label for="email">Email</Label>
				<div class="flex gap-2">
					<Input id="email" type="email" class="flex-2" bind:value={formData.email} />
					<Button type="submit" class="flex-1 ">Save</Button>
				</div>
			</div>

			<!-- Current Password Field -->
			<div class="space-y-2">
				<Label for="currentPassword">Current Password</Label>
				<div class="relative">
					<Input
						id="currentPassword"
						type={showPassword ? 'text' : 'password'}
						bind:value={formData.currentPassword}
						class="pr-12"
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onclick={() => togglePasswordVisibility('current')}
						class="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
					>
						{showPassword ? 'Hide' : 'Show'}
					</Button>
				</div>
			</div>

			<!-- New Password Field -->
			<div class="space-y-2">
				<Label for="newPassword">New Password</Label>
				<div class="relative">
					<Input
						id="newPassword"
						type={showNewPassword ? 'text' : 'password'}
						bind:value={formData.newPassword}
						class="pr-12"
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onclick={() => togglePasswordVisibility('new')}
						class="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
					>
						{showNewPassword ? 'Hide' : 'Show'}
					</Button>
				</div>
			</div>

			<!-- Confirm Password Field -->
			<div class="space-y-2">
				<Label for="confirmPassword">Confirm New Password</Label>
				<div class="relative">
					<Input
						id="confirmPassword"
						type={showConfirmPassword ? 'text' : 'password'}
						bind:value={formData.confirmPassword}
						class="pr-12"
					/>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onclick={() => togglePasswordVisibility('confirm')}
						class="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
					>
						{showConfirmPassword ? 'Hide' : 'Show'}
					</Button>
				</div>
			</div>

			<!-- Submit Button -->
			<Button type="submit" class="">Save</Button>
		</form>
	</CardContent>
</Card>
