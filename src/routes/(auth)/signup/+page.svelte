<script lang="ts">
<<<<<<< HEAD
	import SignupForm from '@/components/auth/signup-form.svelte';

	let { data } = $props();
=======
	import SignupForm from '$lib/components/auth/signup-form.svelte';
>>>>>>> dac7c7068568019152c2586398df7976d8a72696
</script>

<SignupForm data={data.form} />
