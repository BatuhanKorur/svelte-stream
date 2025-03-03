<script lang="ts">
  import {models, selectedModel} from '$lib/store/chat'
  import {socket} from '$lib/socket'

  function handleSelect(model) {
    selectedModel.set(model)
    socket.send({type: 'SET_MODEL', model: model.name})
  }
</script>
<div class="mt-3">
  <p class="text-base text-zinc-400 font-medium mb-2">Ollama Models</p>
  <div class="gap-y-2 grid">
    {#each $models as model}
      <div class="border px-4 py-3 rounded-md flex items-center justify-between" on:click={() => handleSelect(model)}>
        <div>
          <p>{model.name}</p>
        </div>
        <div>
          {#if $selectedModel === model}
            <div class="size-3 rounded-full bg-emerald-400"></div>
          {:else}
            <div class="size-3 rounded-full bg-zinc-600"></div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>