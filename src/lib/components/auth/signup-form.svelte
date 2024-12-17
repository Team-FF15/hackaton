<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	// Form state
	let fullName: string = $state('');
	let email: string = $state('');
	let password: string = $state('');
	let confirmPassword: string = $state('');
	let agreeToTerms: boolean = $state(false);
	let isLoading: boolean = $state(false);

	/** Handle form submission */
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;

		// Simulate API call
		setTimeout(() => {
			console.log({ fullName, email, password, confirmPassword, agreeToTerms });
			isLoading = false;
		}, 2000);
	};
</script>

<form class="mt-8 space-y-6" onsubmit={handleSubmit}>
	<div class="space-y-4 rounded-md shadow-sm">
		<!-- Full Name input -->
		<div class="space-y-2">
			<label for="fullName" class="text-sm font-medium">Username</label>
			<Input
				id="fullName"
				type="text"
				required
				bind:value={fullName}
				placeholder="Enter your full name"
			/>
		</div>

		<!-- Email input -->
		<div class="space-y-2">
			<label for="email" class="text-sm font-medium">Email address</label>
			<Input id="email" type="email" required bind:value={email} placeholder="Enter your email" />
		</div>

		<!-- Password input -->
		<div class="space-y-2">
			<label for="password" class="text-sm font-medium">Password</label>
			<Input
				id="password"
				type="password"
				required
				bind:value={password}
				placeholder="Create a password"
			/>
		</div>

		<!-- Confirm Password input -->
		<div class="space-y-2">
			<label for="confirmPassword" class="text-sm font-medium">Confirm Password</label>
			<Input
				id="confirmPassword"
				type="password"
				required
				bind:value={confirmPassword}
				placeholder="Confirm your password"
			/>
		</div>
	</div>

	<!-- Terms and Conditions -->
	<div class="flex items-center gap-2">
		<Checkbox id="terms" bind:checked={agreeToTerms} />
		<Label
			for="terms"
			class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
		>
			I agree to the <a href="/terms" class="text-primary hover:underline">Terms and Conditions</a>
		</Label>
	</div>

	<!-- Submit button -->
	<Button type="submit" class="w-full" disabled={isLoading || !agreeToTerms}>
		{#if isLoading}
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
