<script lang="ts">
	import SigninForm from '@/components/auth/signin-form.svelte';

	let { data } = $props();
</script>

<SigninForm data={data.form} />
