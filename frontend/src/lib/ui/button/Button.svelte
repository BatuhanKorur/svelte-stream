<script lang="ts">
  let {
    label = '',
    size = '24',
    children,
    ...rest
  } = $props();


</script>
<button class={`bg-zinc-800 border border-zinc-600 flex items-center justify-center rounded transition duration-200 ease-in-out hover:opacity-80 cursor-pointer`}
        style={`height: ${size}px; min-width: ${size}px`}
        {...rest}

>
  { label }
  {@render children()}
</button>