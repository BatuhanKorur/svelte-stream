<script lang="ts" xmlns="http://www.w3.org/1999/html">
    import '../app.css';
    import { isConnected, connect, disconnect } from '$lib/socket'

    let { children } = $props();

    function toggleConnection() {
      $isConnected ? disconnect() : connect()
    }
</script>

{#snippet link(label, href)}
  <a href={href} class="text-[15px] leading-none mr-4 py-2 transition duration-200 ease-in-out hover:text-blue-300">
    {label}
  </a>
{/snippet}

  <div class="bg-zinc-950 min-h-screen h-full flex flex-col">
      <div class="border-b h-12 flex items-center px-3">
        <div class="grow">
          {@render link('Logs', '/logs')}
          {@render link('Chat', '/chat')}
        </div>
        <button class="flex items-center space-x-2 h-7 px-2 bg-zinc-800/75 rounded-xl transition duration-200 ease-in-out cursor-pointer hover:opacity-80" onclick={toggleConnection}>
          <span class="text-[14px] leading-none font-medium opacity-75 ">Socket</span>
          {#if $isConnected}
            <span class="size-3 bg-emerald-400 rounded-full"></span>
          {:else}
            <span class="size-3 bg-rose-400 rounded-full"></span>
          {/if}
        </button>
      </div>
      {@render children()}
  </div>
