<script lang="ts">
  import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  import { SidebarProvider } from "$lib/components/ui/sidebar";

  let { children } = $props();
</script>

<SidebarProvider>
  <div class="flex min-h-screen w-screen">
    <Navbar />
    <main class="flex-1 py-2 pl-4 flex bg-muted">
      <div class="flex h-full w-[100%] bg-white rounded-l-md border p-4">
        {@render children?.()} 
      </div>
    </main>
  </div>
</SidebarProvider>