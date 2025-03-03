<script lang="ts">
  import { slide } from 'svelte/transition';
  import {cubicInOut} from "svelte/easing";
  import { drawer, closeDrawer } from '$lib/store/drawer';
  let {
    width = '28rem',
    title = 'Setting'
  } = $props();
</script>

<div
  class="min-h-full border-l overflow-hidden"
  style:width={width}
  transition:slide={{
    duration: 300,
    axis: 'x',
    easing: cubicInOut
  }}
>
  {#if $drawer.isOpen}
    <div>
      <div class="flex justify-between items-center px-4 py-3">
        <h2 class="text-lg font-semibold">{ title }</h2>
        <button class="p-2 flex items-center justify-center rounded-lg hover:bg-zinc-800 cursor-pointer transition-colors" on:click={closeDrawer}>
          <iconify-icon icon="weui:close-filled" />
        </button>
      </div>
      <div class="px-4">
        {#if $drawer.component}
          <svelte:component
            this={$drawer.component}
            {...($drawer.props || {})}
          />
        {/if}
      </div>
    </div>
  {/if}
</div>
