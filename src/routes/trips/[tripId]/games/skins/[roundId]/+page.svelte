<script lang="ts">
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem href={`/trips/${data.trip.id}/games/skins`} label="Skins" />
		<BreadcrumbItem label={`${data.round?.name}`} />
	</Breadcrumbs>
	<h2>{data.round?.name} Skins</h2>
	<ol>
		{#each [...data.skins] as [player, holes]}
			<li>
				<span class="player-data">
					<b>{player}</b>
					<div class="holes">({holes.join(', ')})</div>
				</span>
				<span class="player-score">
					{holes.length}
					<!-- {#each holes as hole}
						<span class="hole">{hole}</span>
					{/each} -->
				</span>
			</li>
		{/each}
	</ol>
</div>

<style lang="scss">
	ol {
		padding-left: 0;
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	li {
		color: unset;
		background-color: var(--dp-02);
		border-radius: 8px;

		padding-left: 16px;

		display: flex;
		justify-content: space-between;
		align-items: stretch;
	}

	.holes {
		font-style: italic;
		font-size: 0.75rem;
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
</style>
