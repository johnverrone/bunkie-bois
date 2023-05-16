<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import PageTitle from '@components/PageTitle.svelte';

	export let data: LayoutData;
</script>

<PageTitle><a href="/trips">{data.trip.name}</a></PageTitle>

<nav>
	<ul class="tabs">
		<li class="tab-item" class:active={$page.route.id?.startsWith('/trips/[tripId]/rounds')}>
			<a href={`/trips/${data.trip.id}/rounds`}>Rounds</a>
		</li>
		<li class="tab-item" class:active={$page.route.id?.startsWith('/trips/[tripId]/players')}>
			<a href={`/trips/${data.trip.id}/players`}>Players</a>
		</li>
	</ul>
</nav>

<div class="trip-layout">
	<slot />
</div>

<style>
	:root {
		--header-height: 56px;
		--nav-height: 60px;
	}

	.trip-layout {
		height: calc(100% - var(--nav-height) - var(--header-height));

		display: grid;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			'content'
			'bottom';
	}

	nav {
		/* --bg-base: 210deg 9%; */
		--bg-base: 205deg 20%;
		--bg-normal: hsl(var(--bg-base) 13%);
		--bg-active: hsl(var(--bg-base) 10%);

		--fg-normal: #fefefe;
		--fg-active: var(--primary);

		position: fixed;
		height: 60px;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.tabs {
		display: flex;
		list-style: none;
		padding-left: 0;
		height: 100%;
	}

	.tab-item {
		background: none;
		border: none;
		flex: 1;

		background-color: var(--bg-normal);
		color: var(--fg-normal);

		transition: all 100ms ease-in-out;
		transition-property: color, background-color;
	}

	.tab-item.active {
		background-color: var(--bg-active);
		color: var(--fg-active);
		border-top: 1px solid var(--fg-active);
	}

	.tab-item a {
		color: inherit;
		text-decoration: none;
		width: 100%;
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
