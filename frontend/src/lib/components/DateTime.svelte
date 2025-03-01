<script lang="ts">
    import dayjs from 'dayjs'
    import relativeTime from 'dayjs/plugin/relativeTime'
    import { onMount, onDestroy } from 'svelte';
    dayjs.extend(relativeTime);

    interface DateTimeProps {
        date: string;
        as: 'relative' | 'readable';
    }
    let { date, as }: DateTimeProps = $props();

    let readableString = $state(dayjs(date).format('DD/MM/YYYY HH:mm:ss'));

    let relativeString = $state('')
    let intervalId: number;
    function updateRelativeTime() {
        relativeString = dayjs(date).fromNow();
    }
    onMount(() => {
        if(as !== 'relative') return
        updateRelativeTime(); // Initial update
        intervalId = setInterval(updateRelativeTime, 10000); // Update every 10seconds
    });

    onDestroy(() => {
        if (as !== 'relative') return;
        if (intervalId) clearInterval(intervalId);
    });
</script>

<span>
    {#if as === 'relative' }
        {relativeString}
    {:else}
        {readableString}
    {/if}
</span>