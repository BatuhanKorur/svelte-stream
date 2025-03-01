<script lang="ts">
import { messages } from '$lib/socket'
import Logs from "$lib/components/Logs.svelte";
</script>
<div class="max-w-[800px] mx-auto">
    <Logs messages={$messages}/>
</div>
