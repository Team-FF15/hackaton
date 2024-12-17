<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Bike } from "lucide-svelte";
    import { fade, fly } from "svelte/transition";
</script>

<section class="relative min-h-screen flex items-center justify-center pt-16">
    <!-- Background pattern -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Content container with fade transition -->
        <div class="text-center space-y-8" transition:fade={{ duration: 300 }}>
            <!-- Hero Icon with fly transition -->
            <div class="flex justify-center">
                <div class="p-3 bg-primary/10 rounded-full" transition:fly={{ y: 20, duration: 300, delay: 300 }}>
                    <Bike class="w-8 h-8 text-primary" />
                </div>
            </div>

            <!-- Main heading -->
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold" transition:fade={{ duration: 300, delay: 150 }}>
                Rent a Bike with <span class="text-primary">FFBIKES</span>
            </h1>

            <!-- Subheading -->
            <p class="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground" transition:fade={{ duration: 300, delay: 200 }}>
                Experience the freedom of two wheels. Rent a bike instantly and explore the city at your own pace.
            </p>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4" transition:fade={{ duration: 300, delay: 250 }}>
                <Button href="/signup" size="lg">Start Renting</Button>
                <Button variant="outline" href="/login" size="lg">Login</Button>
            </div>

            <!-- Trust badges -->
            <div class="pt-12" transition:fade={{ duration: 300, delay: 300 }}>
                <p class="text-sm text-muted-foreground mb-4">Trusted by cyclists worldwide</p>
                <div class="flex flex-wrap justify-center items-center gap-8">
                    <div class="flex items-center gap-1">
                        <span class="text-3xl font-bold">10K+</span>
                        <span class="text-muted-foreground">Active users</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="text-3xl font-bold">50+</span>
                        <span class="text-muted-foreground">Cities</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="text-3xl font-bold">1M+</span>
                        <span class="text-muted-foreground">Rides completed</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
