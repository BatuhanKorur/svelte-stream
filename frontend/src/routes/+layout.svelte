<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import * as Resizable from '$lib/ui/resizable/index'
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
<div class="bg-zinc-950 min-h-screen h-full">
        <Resizable.PaneGroup direction="horizontal" class="min-h-screen h-full items-stretch">
            <Resizable.Pane
                    defaultSize={350}
                    collapsedSize={4}
                    collapsible
                    minSize={14}
                    maxSize={24}
                    class="p-2 border-r"
            >
                <SocketCard toggle={toggleConnection}/>
            </Resizable.Pane>
            <Resizable.Handle withHandle></Resizable.Handle>
            <Resizable.Pane defaultSize={440} minSize={30} class="bg-zinc-900">
                {@render children()}
            </Resizable.Pane>
        </Resizable.PaneGroup>

</div>
</QueryClientProvider>