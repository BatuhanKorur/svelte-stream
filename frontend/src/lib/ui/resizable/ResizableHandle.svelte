<script lang="ts">
    import * as ResizablePrimitive from "paneforge";
    import { cn } from "$lib/utils.js";

    type $$Props = ResizablePrimitive.PaneResizerProps & {
        withHandle?: boolean;
    };

    export let withHandle: $$Props["withHandle"] = false;
    export let el: $$Props["el"] = undefined;
    let className: $$Props["class"] = undefined;
    export { className as class };
</script>

<ResizablePrimitive.PaneResizer
        bind:el
        class={cn(
          'border',
	      	"relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[direction=vertical]:h-px data-[direction=vertical]:w-full data-[direction=vertical]:after:left-0 data-[direction=vertical]:after:h-1 data-[direction=vertical]:after:w-full data-[direction=vertical]:after:-translate-y-1/2 data-[direction=vertical]:after:translate-x-0 [&[data-direction=vertical]>div]:rotate-90",
		className
	)}
>
    {#if withHandle}
        <div class="bg-zinc-800 z-10 flex size-4 items-center justify-center rounded-sm border">
            <iconify-icon icon="iconamoon:menu-kebab-horizontal-bold" class="text-zinc-200 scale-[0.9]"/>
        </div>
    {/if}
</ResizablePrimitive.PaneResizer>
