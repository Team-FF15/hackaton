<script lang="ts">
	import Hero from '@/components/landing-page/hero.svelte';
	import Navbar from '@/components/landing-page/navbar.svelte';
	let isMobileMenuOpen = $state(false);
</script>

<main class="min-h-screen w-full bg-background">
	<Navbar bind:isMobileMenuOpen />
	<Hero />
</main>
