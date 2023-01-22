<script lang="ts">
	import type { LayoutServerData } from './$types';
	import { page } from '$app/stores';
	import PageTitle from '@components/PageTitle.svelte';

	export let data: LayoutServerData;
</script>

<PageTitle>{data.name}</PageTitle>

<nav>
	<ul class="tabs">
		<li class="tab-item" class:active={$page.route.id?.startsWith('/[tripId]/rounds')}>
			<a href={`/${data.id}/rounds`}>Rounds</a>
		</li>
		<li class="tab-item" class:active={$page.route.id?.startsWith('/[tripId]/players')}>
			<a href={`/${data.id}/players`}>Players</a>
		</li>
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	:root {
		--header-height: 56px;
		--nav-height: 60px;
	}

	main {
		height: calc(100% - var(--nav-height) - var(--header-height));
		padding: 0 1rem 1rem 1rem;

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
