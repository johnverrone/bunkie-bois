<script>
	import Main from '$lib/components/Main.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';

	let { children } = $props();
</script>

<PageTitle>Courses</PageTitle>

<Main>
	{#if $delayedNavigation}
		<Loading />
	{/if}
	{@render children()}
</Main>
