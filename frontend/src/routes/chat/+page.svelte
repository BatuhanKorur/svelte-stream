<script lang="ts">
    import { onMount } from "svelte";
    import { socket, messages, responseString } from "$lib/socket";
    import {createQuery} from "@tanstack/svelte-query";

    const query = createQuery({
        queryKey: ['models'],
        queryFn: async () => (await fetch('http://localhost:3000/ollama/models')).json(),
    })
    const models = $state([]);
    onMount(async () => {
        try {
            const response = await fetch('http://localhost:3000/ollama/models');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    });
    function onClick(){
        socket.sendMessage({
            type: 'AI',
            message: 'AI Hello'
        });
        console.log('AI Hello');
    }

    let msg = $state('')
    function onKeyDown(event: KeyboardEvent) {
        if(event.key === 'Enter' && msg.trim() !== ''){
            socket.sendMessage({
                type: 'AI',
                message: msg
            });
            msg = '';
        }
        console.log('Hello', event);
    }
</script>
<div class="grow">
    <div class="p-4">
        <p>{$responseString}</p>
    </div>
    <div class="mt-2">
        <input
                bind:value={msg}
                type="text" class="bg-zinc-500" onkeydown={onKeyDown}/>
    </div>
</div>