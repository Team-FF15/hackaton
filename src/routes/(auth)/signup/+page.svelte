<script lang="ts">
	import SignupForm from '@/components/auth/signup-form.svelte';

	let { data } = $props();
</script>

<SignupForm data={data.form} />
