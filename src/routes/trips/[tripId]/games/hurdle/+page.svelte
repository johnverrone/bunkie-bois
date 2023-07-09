<script lang="ts">
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem label="Hurdle" />
	</Breadcrumbs>
	<!-- <h2>Trip Leaderboard</h2>

	<ol>
		{#each data.tripPlayers as player}
			<li>
				<span>{player.name}</span>
			</li>
		{/each}
	</ol> -->

	<h2>Round Breakdown</h2>
	<ol>
		{#each data.rounds as round}
			<li><a href={`/trips/${data.trip.id}/games/hurdle/${round.id}`}>{round.name}</a></li>
		{/each}
	</ol>
</div>

<style lang="scss">
	ol {
		list-style: none;
		padding-inline-start: 0;
		margin: 0;
	}

	li {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
	}
</style>
