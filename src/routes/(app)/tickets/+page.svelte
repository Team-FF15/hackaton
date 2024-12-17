<script lang="ts">
	import { AlertCircle, Upload } from 'lucide-svelte';

	// Take onSubmit function as prop
	const { onSubmit }: { onSubmit: () => void } = $props();

	// Form fields state

	let bikeId: string = $state('');
	let message: string = $state('');
	let priority: string = $state('low');
	let image: File | null = $state(null);
	let imagePreview: string = $state('');

	// Track form errors
	let errors = $state<Record<string, string>>({});

	/** Handle image upload */
	const handleImageUpload = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			const file = input.files[0];
			// Only allow images
			if (!file.type.startsWith('image/')) {
				errors = { ...errors, image: 'Please upload an image file' };
				return;
			}
			// Max size 5MB
			if (file.size > 5 * 1024 * 1024) {
				errors = { ...errors, image: 'Image must be less than 5MB' };
				return;
			}
			image = file;
			imagePreview = URL.createObjectURL(file);
			// Remove error if exists
			const { image: _, ...restErrors } = errors;
			errors = restErrors;
		}
	};

	/** Clear selected image */
	const clearImage = () => {
		image = null;
		imagePreview = '';
	};

	/** Validate form fields */
	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};

		if (!bikeId.trim()) newErrors.subject = 'Bike serial is required';
		if (!message.trim()) newErrors.message = 'Message is required';

		errors = newErrors;
		return Object.keys(errors).length === 0;
	};

	/** Handle form submission */
	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// Call parent onSubmit
			onSubmit();
			// Reset form

			bikeId = '';
			message = '';
			priority = 'low';
			image = null;
			imagePreview = '';
			errors = {};
		}
	};
</script>

<form class="rounded-lg bg-white p-8" onsubmit={handleSubmit}>
	<!-- Subject Field -->
	<div class="mb-6">
		<label for="bikeId" class="mb-2 block font-medium">Bike serial</label>
		<input
			type="text"
			id="bikeId"
			bind:value={bikeId}
			class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
			placeholder="Enter bike serial"
		/>
		{#if errors.bikeId}
			<div class="mt-2 flex items-center gap-2 text-sm text-red-500">
				<AlertCircle class="h-4 w-4" />
				{errors.bikeId}
			</div>
		{/if}
	</div>

	<!-- Priority Field -->
	<div class="mb-6">
		<label for="priority" class="mb-2 block font-medium">Priority</label>
		<select
			id="priority"
			bind:value={priority}
			class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
		>
			<option value="low">Low</option>
			<option value="medium">Medium</option>
			<option value="high">High</option>
		</select>
	</div>

	<!-- Message Field -->
	<div class="mb-6">
		<label for="message" class="mb-2 block font-medium">Message</label>
		<textarea
			id="message"
			bind:value={message}
			class="h-32 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
			placeholder="Describe your issue"
		></textarea>
		{#if errors.message}
			<div class="mt-2 flex items-center gap-2 text-sm text-red-500">
				<AlertCircle class="h-4 w-4" />
				{errors.message}
			</div>
		{/if}
	</div>

	<!-- Image Upload Field -->
	<div class="mb-6">
		<label for="image" class="mb-2 block font-medium">Attachment (Optional)</label>
		<div class="relative">
			<input type="file" id="image" accept="image/*" onchange={handleImageUpload} class="hidden" />
			<label
				for="image"
				class="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-orange-500 p-4 transition-colors hover:border-blue-500"
			>
				<Upload class="h-5 w-5 text-gray-500" />
				<span class="text-gray-600">Click to upload image</span>
			</label>
		</div>
		{#if imagePreview}
			<div class="mt-4 rounded-lg border border-gray-200 p-4">
				<img src={imagePreview} alt="Preview" class="mx-auto max-h-48 rounded-lg object-contain" />
				<button
					type="button"
					onclick={clearImage}
					class="mt-2 w-full rounded-lg border border-red-500 px-4 py-2 text-red-500 transition-colors hover:bg-red-50"
					>Remove Image</button
				>
			</div>
		{/if}
		{#if errors.image}
			<div class="mt-2 flex items-center gap-2 text-sm text-red-500">
				<AlertCircle class="h-4 w-4" />
				{errors.image}
			</div>
		{/if}
	</div>

	<!-- Submit Button -->
	<button
		type="submit"
		class="w-full rounded-lg bg-blue-500 px-6 py-4 font-semibold text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
		>Submit Ticket</button
	>
</form>
