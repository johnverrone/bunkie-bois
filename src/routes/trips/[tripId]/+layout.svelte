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

<PageTitle>{data.trip.name}</PageTitle>

<NavBar
	items={[
		{
			href: `/trips/${data.trip.id}/rounds`,
			label: 'Rounds',
			active: $page.route.id?.startsWith('/trips/[tripId]/rounds') ?? false
		},
		{
			href: `/trips/${data.trip.id}/players`,
			label: 'Players',
			active: $page.route.id?.startsWith('/trips/[tripId]/players') ?? false
		},
		{
			href: `/trips/${data.trip.id}/games`,
			label: 'Games',
			active: $page.route.id?.startsWith('/trips/[tripId]/games') ?? false
		},
		{
			href: `/trips/${data.trip.id}/settings`,
			label: 'Settings',
			active: $page.route.id?.startsWith('/trips/[tripId]/settings') ?? false
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
