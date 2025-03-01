<script lang="ts">
    let { children } = $props();
    import { browser } from '$app/environment'
    import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

    import '../app.css';

    import { isConnected, connect, disconnect, messages, WEBSOCKET_URL } from '$lib/socket'
    import Logs from "$lib/components/Logs.svelte";
    import SocketCard from "$lib/components/SocketCard.svelte";


    function toggleConnection() {
        console.log('Hello')
        if ($isConnected) {
            disconnect()
        } else {
            connect()
        }
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
            },
        },
    })
</script>
<QueryClientProvider client={queryClient}>
<div class="bg-zinc-950 min-h-screen h-full flex flex-col">
    <div class="border-b h-12 flex items-center px-4">
        <button class="flex items-center space-x-3" onclick={toggleConnection}>
            <p class="leading-4">Socket</p>
            {#if $isConnected}
                <div class="size-3 bg-emerald-400 rounded-full"></div>
            {:else}
                <div class="size-3 bg-rose-400 rounded-full"></div>
            {/if}
        </button>
    </div>
    {@render children()}
</div>
</QueryClientProvider>