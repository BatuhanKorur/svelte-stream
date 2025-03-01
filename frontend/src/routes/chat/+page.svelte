<script lang="ts">
  import {socket, isConnected, connect} from "$lib/socket";
  import {chatMessages, isChatting} from "$lib/store/chat";
  import {onMount} from "svelte";
  import {readableSeconds} from "$lib/utils.js";
  onMount(() => {
    connect();
  });

  let msg = $state('')

  function onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && msg.trim() !== '') {
        socket.send({
          type: 'AI',
          message: msg
        });
      msg = '';
    }
    console.log('Hello', event);
  }
</script>
<div class="grow overflow-y-auto">
  {#each $chatMessages as resp}
    <div class="p-3">
      <p class="text-[15.5px] text-zinc-100 leading-[24px]">{resp.response}</p>
    </div>
    {#if resp.done}
      <div class="px-3 flex items-center gap-x-3">
        <span class="text-xs text-zinc-400">Tokens {resp.info.tokens_count}</span>
        <span class="text-xs text-zinc-400">Duration { readableSeconds(resp.info.total_duration) }</span>
      </div>
    {/if}
  {/each}
</div>
<div class="shrink-0 border-t p-3 group" tabindex="0">
  <div class="bg-zinc-800 w-full h-10 rounded-md px-3 flex items-center">
    {#if $isChatting}
      <p>Typing...</p>
    {:else}
      <input
        bind:value={msg}
        type="text"
        class=" placeholder:text-sm w-full outline-none"
        placeholder="Type a message"
        onkeydown={onKeyDown}/>
    {/if}
  </div>
</div>
