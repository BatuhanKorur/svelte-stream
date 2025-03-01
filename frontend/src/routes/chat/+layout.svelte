<script lang="ts">
  import { selectedModel } from "$lib/store/chat";
  import {onMount} from "svelte";
  let { data, children } = $props();

  onMount(() => {
    if (!data.models || data.models.length === 0) return;
    selectedModel.update((model) => {
      if(model === null) return data.models[0];
      return model;
    })
  })
</script>

{#if $selectedModel}
<div class="p-4 border-b">
  <p class="text-lg font-semibold">{$selectedModel.name}</p>
</div>
{/if}
<div class="grow h-full relative flex flex-col">
  {@render children()}
</div>