<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';

	// Form state
	let email: string = $state('');
	let password: string = $state('');
	let rememberMe: boolean = $state(false);
	let isLoading: boolean = $state(false);

	/** Handle form submission */
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		isLoading = true;

		// Simulate API call
		setTimeout(() => {
			console.log({ email, password, rememberMe });
			isLoading = false;
		}, 2000);
	};
</script>

<form class="mt-8 space-y-6" onsubmit={handleSubmit}>
	<div class="space-y-4 rounded-md shadow-sm">
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
				placeholder="Enter your password"
			/>
		</div>
	</div>

	<!-- Remember me and Forgot password -->
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-2">
			<Checkbox id="remember-me" bind:checked={rememberMe} />
			<Label
				for="remember-me"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>Remember me</Label
			>
		</div>

		<div class="text-sm">
			<a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
		</div>
	</div>

	<!-- Submit button -->
	<Button type="submit" class="w-full" disabled={isLoading}>
		{#if isLoading}
			<span transition:fade>Loading...</span>
		{:else}
			Sign in
		{/if}
	</Button>

	<!-- Sign up link -->
	<p class="mt-2 text-center text-sm text-gray-600">
		Not a member?
		<a href="#" class="font-medium text-blue-600 hover:text-blue-500">Sign up now</a>
	</p>
</form>
