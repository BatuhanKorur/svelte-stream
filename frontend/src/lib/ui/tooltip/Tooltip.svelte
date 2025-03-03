<script lang="ts">
  import { Tooltip } from "bits-ui";
  let {
    tip,
    children,
    align = "center",
    alignOffset = 0,
    side = "top",
    sideOffset = 6,
  } = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root delayDuration={50}>
    <Tooltip.Trigger>
      {@render children()}
    </Tooltip.Trigger>
    <Tooltip.Content {alignOffset} {sideOffset} {side} {align}>
      <div class="bg-white/1 backdrop-blur-2xl text-zinc-300 border px-3 py-1 rounded-md">
        <span class="text-sm leading-none">{ tip }</span>
      </div>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>