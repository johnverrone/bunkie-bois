<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';

	export let data: LayoutData;
</script>

<header>
	<span>{data.name}</span>
</header>

<nav>
	<ul class="tabs">
		<li class="tab-item" class:active={$page.route.id?.startsWith('[tripId]/rounds')}>
			<a href={`/${data.id}/rounds`}>Rounds</a>
		</li>
		<li class="tab-item" class:active={$page.route.id?.startsWith('[tripId]/players')}>
			<a href={`/${data.id}/players`}>Players</a>
		</li>
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	:root {
		--header-height: 59px;
		--nav-height: 60px;
	}

	main {
		height: calc(100% - var(--nav-height));
		padding-inline: 1rem 1rem;
		padding-top: var(--header-height);
		padding-bottom: 1rem;

		display: grid;
		grid-template-rows: auto 1fr auto;
	}

	header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;

		display: grid;
		place-items: center;
		padding-block: 1rem;
	}

	header h1 {
		font-size: 1.125rem;
	}

	nav {
		--bg-base: 210deg 9%;
		--bg-normal: hsl(var(--bg-base) 25%);

		--fg-normal: white;
		--fg-active: hsl(105 85% 63%);

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
		background-color: var(--bg-normal);
		color: var(--fg-active);
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
