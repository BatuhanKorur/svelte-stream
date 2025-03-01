<script lang="ts">
    import DateTime from "$lib/components/DateTime.svelte";

    let { messages } = $props()
</script>
<div class="border p-5 rounded-md">
    {#if messages.length === 0}
        <p class="text-zinc-400">No messages yet.</p>
    {:else}
        <ul>
            {#each messages as message}
                <li class="text-zinc-300">{message.type}</li>
                <li class="text-zinc-300">{message.message}</li>
                <li class="text-zinc-300"><DateTime date={message.timestamp}></DateTime></li>
            {/each}
        </ul>
    {/if}
</div>