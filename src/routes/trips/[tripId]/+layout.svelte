<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import Main from '@components/Main.svelte';
	import NavBar from '@components/NavBar.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import { onMount } from 'svelte';
	import { trip } from '$lib/stores/trip';

	export let data: LayoutData;

	onMount(() => {
		trip.set(data.trip.id);
	});
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
			href: '/settings',
			label: 'Settings',
			active: $page.route.id?.startsWith('/settings') ?? false
		}
	]}
/>

<Main>
	<div class="float-bottom">
		<slot />
	</div>
</Main>

<style>
	.float-bottom {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}
</style>
