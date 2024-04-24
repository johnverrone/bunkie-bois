<script lang="ts">
	import Main from '$lib/components/Main.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';

	export let data: LayoutData;
</script>

<PageTitle>{data.league.name}</PageTitle>

<NavBar
	items={[
		{
			href: `/leagues/${data.league.id}/standings`,
			label: 'Standings',
			active: $page.route.id?.startsWith('/leagues/[leagueId]/standings') ?? false
		},
		{
			href: `/leagues/${data.league.id}`,
			label: 'Schedule',
			active: $page.route.id?.startsWith('/leagues/[leagueId]/schedule') ?? false
		},
		{
			href: `/leagues/${data.league.id}`,
			label: 'Teams',
			active: $page.route.id?.startsWith('/leagues/[leagueId]/teams') ?? false
		},
		{
			href: `/leagues/${data.league.id}/settings`,
			label: 'Settings',
			active: $page.route.id?.startsWith('/leagues/[leagueId]/settings') ?? false
		}
	]}
/>

<Main>
	{#if $delayedNavigation}
		<Loading />
	{/if}
	<div class="float-bottom">
		<slot />
	</div>
</Main>

<style>
	.float-bottom {
		min-height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}
</style>
