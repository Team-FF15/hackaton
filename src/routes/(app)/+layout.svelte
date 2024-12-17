<script lang="ts">
  import Navbar from "$lib/components/ui/navbar/navbar.svelte";
  import { SidebarProvider } from "$lib/components/ui/sidebar";
  import Badge from "@/components/ui/badge/badge.svelte";
  import { Bell, Coins, FileDown } from "lucide-svelte";
  import { Button } from "$lib/components/ui/button/index.js";
  let { children } = $props();
</script>

<SidebarProvider>
  <div class="flex min-h-screen w-screen max-h-screen">
    <Navbar />
    <main class="flex-1 py-2 pl-4 flex bg-muted">
      <div class="flex flex-col h-full w-[100%] bg-white rounded-l-md border">
        <div class="w-full border-b p-4 flex justify-between items-center">
            <div class="flex items-center justify-between">
                <Badge class="text-md"><Coins size={16} class="mr-2" />19000 coins</Badge>
            </div>
            <div>
                <Button variant="outline" size="icon"><Bell size={16}/></Button>
                <Button><FileDown size={16} class="mr-1" />Export data</Button>
            </div>
        </div>
        <div class="flex-1 p-4 overflow-y-auto">
            {@render children?.()}
        </div>
      </div>
    </main>
  </div>
</SidebarProvider>