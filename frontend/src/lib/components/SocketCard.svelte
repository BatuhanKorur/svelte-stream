<script lang="ts">
    import { isConnected, connect, disconnect, messages, WEBSOCKET_URL } from '$lib/socket'
    let { toggle } = $props();
</script>
<div class="bg-zinc-900 rounded-md flex justify-between px-3 py-2">
    <div>
        <span class="text-xs text-zinc-300">Web Socket</span>
        {#if $isConnected}
            <p class="text-emerald-400 font-semibold text-sm">Connected</p>
        {:else}
            <p class="text-rose-300 font-semibold text-sm">Disconnected</p>
        {/if}
    </div>
    <button onclick={toggle}>
        {#if $isConnected}
            <iconify-icon icon="hugeicons:connect" />
        {:else}
            <iconify-icon icon="hugeicons:gps-disconnected" class="" />
        {/if}
    </button>
<!--    <span class="text-sm font-semibold">{WEBSOCKET_URL}</span>-->
</div>