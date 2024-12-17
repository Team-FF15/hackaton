<!-- Sidebar.svelte -->
<script lang="ts">
    import { Avatar, AvatarFallback } from "$lib/components/ui/avatar";
    import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "$lib/components/ui/dropdown-menu";
    import { Separator } from "$lib/components/ui/separator";
    import * as Sidebar from "$lib/components/ui/sidebar";
    import { Bike, Settings, AlertCircle, LogOut, LayoutDashboard, FileText } from "lucide-svelte";
    
    export let userName = "John Doe";
    export let userEmail = "john@example.com";
  </script>
  
  <Sidebar.Root>
    <Sidebar.Content>
      <div class="flex h-full flex-col bg-muted">
        <!-- Logo -->
        <div class="flex items-center gap-2 px-4 py-4">
          <Bike class="w-6 h-6" />
          <span class="text-xl font-bold">FFBIKES</span>
        </div>
  
        <!-- Navigation -->
        <nav class="flex-1 space-y-1 px-2 py-4">
          <a href="/dashboard" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent">
            <LayoutDashboard class="h-4 w-4" />
            Dashboard
          </a>
          <a href="/tickets" class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-accent">
            <FileText class="h-4 w-4" />
            Tickets
          </a>
        </nav>
  
        <!-- User section -->
        <div class="p-4">
          <div class="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div class="flex-1 text-sm">
              <p class="font-medium">{userName}</p>
              <p class="text-muted-foreground">{userEmail}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger class="cursor-pointer">
                <Settings class="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Settings class="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <AlertCircle class="w-4 h-4 mr-2" />
                  Report an issue
                </DropdownMenuItem>
                <DropdownMenuItem class="text-destructive">
                  <LogOut class="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </Sidebar.Content>
  </Sidebar.Root>