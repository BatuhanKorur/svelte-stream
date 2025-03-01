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
<div class="grow h-full mx-2 relative">
    <div>
        {#each $chatMessages as resp}
            <p>{resp.response}</p>
        {/each}
    </div>
    <div class="absolute w-full px-3 py-4 bottom-0">
        <input
                bind:value={msg}
                type="text"
                class=" w-full bg-white/5 h-10 rounded-md px-3 placeholder:text-sm"
                placeholder="Type a message"
                onkeydown={onKeyDown}/>
    </div>
</div>