<script lang="ts">
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let { data } = $props();
	let sortedSkins = $derived([...data.cummulativeSkins].sort(([, a], [, b]) => b - a));
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem label="Skins" />
	</Breadcrumbs>

	<h3>Trip Total</h3>
	<ol class="skin-list">
		{#each sortedSkins as [player, skins]}
			<li class="skin-list-item">
				<span class="player-data">
					<b>{player}</b>
				</span>
				<span class="player-score">
					{skins}
				</span>
			</li>
		{/each}
	</ol>

	<h3>By Round</h3>
	<ol class="round-list">
		{#each data.rounds as round}
			<li class="round-list-item">
				<a href={`/trips/${data.trip.id}/games/skins/${round.id}`}>{round.name}</a>
			</li>
		{/each}
	</ol>
</div>

<style lang="scss">
	.skin-list {
		padding-left: 0;
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 32px;
	}

	.skin-list-item {
		color: unset;
		background-color: var(--dp-02);
		border-radius: 8px;

		padding-left: 16px;

		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}

	.player-data {
		padding-block: 8px;
	}

	.player-score {
		background-color: hsl(120, 80%, 50%);
		color: #121212;
		border-radius: inherit;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border: none;

		min-width: 5ch;

		display: grid;
		place-items: center;
		font-weight: bold;
	}

	.round-list {
		list-style: none;
		padding-inline-start: 0;
		margin: 0;
	}

	.round-list-item {
		display: flex;
		justify-content: space-between;
		padding: 8px 0;
	}
</style>
