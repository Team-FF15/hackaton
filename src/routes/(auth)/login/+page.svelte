<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { Lock } from "lucide-svelte";
	import SigninForm from "$lib/components/auth/signin-form.svelte";
	import AuthContainer from "@/components/auth/auth-container.svelte";
</script>

<SigninForm />