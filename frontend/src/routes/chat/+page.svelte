<script lang="ts">
    import { onMount } from "svelte";
    import { socket } from "$lib/socket";
    import { chatMessages } from "$lib/store/chat";
    import {createQuery} from "@tanstack/svelte-query";

    const query = createQuery({
        queryKey: ['models'],
        queryFn: async () => (await fetch('http://localhost:3000/ollama/models')).json(),
    })
    const models = $state([]);

    let msg = $state('')
    function onKeyDown(event: KeyboardEvent) {
        if(event.key === 'Enter' && msg.trim() !== ''){
            socket.send({
                type: 'AI',
                message: msg
            });
            msg = '';
        }
        console.log('Hello', event);
    }
</script>
<div class="grow h-full relative flex flex-col">
    <div class="border-b shrink-0">
        <p class="text-2xl">Chat</p>
    </div>
    <div class="grow overflow-y-auto">
        {#each $chatMessages as resp}
            <p>{resp.response}</p>
            {#if resp.done}
                <div>
                    <span>Tokens {resp.info.tokens_count}</span>
                    <span>Duration { resp.info.total_duration }</span>
                </div>
            {/if}
        {/each}
    </div>
    <div class="shrink-0 border-t p-3">
        <input
                bind:value={msg}
                type="text"
                class=" w-full bg-zinc-800 h-10 rounded-md px-3 placeholder:text-sm"
                placeholder="Type a message"
                onkeydown={onKeyDown}/>
    </div>
</div>