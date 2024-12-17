<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import { Bike, Menu } from 'lucide-svelte';

	let { isMobileMenuOpen = $bindable(false) }: { isMobileMenuOpen: boolean } = $props();
</script>

<nav class="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 backdrop-blur-md">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center gap-2">
				<Bike class="h-6 w-6" />
				<span class="text-xl font-bold">FFBIKES</span>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-4">
				<Button variant="ghost" href="/login">Login</Button>
				<Button href="/signup">Sign up</Button>
			</div>

			<!-- Mobile menu button -->
			<div class="flex md:hidden">
				<Sheet bind:open={isMobileMenuOpen}>
					<SheetTrigger>
						<Button variant="ghost" size="icon">
							<Menu class="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent>
						<div class="mt-8 flex flex-col space-y-4">
							<Button variant="ghost" href="/login" class="w-full justify-start">Login</Button>
							<Button href="/signup" class="w-full justify-start">Sign up</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	</div>
</nav>
