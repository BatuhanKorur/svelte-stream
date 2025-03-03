<script lang="ts">
  import {models, selectedModel} from "$lib/store/chat";
  import {openDrawer} from '$lib/store/drawer';
  import {type Component, onMount} from "svelte";
  import Button from "$lib/ui/button/Button.svelte";
  import Tooltip from "$lib/ui/tooltip/Tooltip.svelte";
  import ChatSettings from "$lib/components/ChatSettings.svelte";

  let {data, children} = $props();

  onMount(() => {
    if (!data.models || data.models.length === 0) return;
    selectedModel.update((model) => {
      if (model === null) return data.models[0];
      return model;
    })
    models.set(data.models);
  })

  function openChatSettings() {
    openDrawer(ChatSettings as Component, {});
  }
</script>

{#if $selectedModel}
  <div class="p-4 border-b flex items-center justify-between">
    <p class="text-lg font-semibold">{$selectedModel.name}</p>
    <div>
      <Tooltip tip="Change model" align="end" side="bottom">
        <Button size="36" onclick={openChatSettings}>
          <iconify-icon icon="line-md:cog-filled-loop" class="text-zinc-300 scale-[0.9]"/>
        </Button>
      </Tooltip>
    </div>
  </div>
{/if}
<div class="grow h-full relative flex flex-col">
  {@render children()}
</div>