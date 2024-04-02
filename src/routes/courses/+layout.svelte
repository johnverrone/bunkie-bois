<script>
	import Main from '$lib/components/Main.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';
</script>

<PageTitle>Courses</PageTitle>

<Main>
	{#if $delayedNavigation}
		<Loading />
	{/if}
	<slot />
</Main>
