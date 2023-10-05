<script>
	import Main from '$lib/components/Main.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';
	import { page } from '$app/stores';
</script>

<PageTitle>Courses</PageTitle>

<NavBar
	items={[
		{
			href: `/trips`,
			label: 'Trips',
			active: $page.route.id?.startsWith('/trips') ?? false
		},
		{
			href: `/courses`,
			label: 'Courses',
			active: $page.route.id?.startsWith('/courses') ?? false
		}
	]}
/>

<Main>
	{#if $delayedNavigation}
		<Loading />
	{/if}
	<slot />
</Main>
