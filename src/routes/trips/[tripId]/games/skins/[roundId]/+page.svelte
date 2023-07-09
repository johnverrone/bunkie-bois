<script lang="ts">
	import { page } from '$app/stores';
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: skinsPlayers = Object.keys(data?.skins ?? {}) as Array<keyof typeof data.skins>;
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem href={`/trips/${data.trip.id}/games/skins`} label="Skins" />
		<BreadcrumbItem label={`${data.round?.name}`} />
	</Breadcrumbs>
	<h2>{data.round?.name} Skins</h2>
	<ol>
		{#each skinsPlayers as player}
			<li>
				<span>{player}</span>
				<span>
					{#each data.skins[player] as hole}
						<span class="hole">{hole}</span>
					{/each}
				</span>
			</li>
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

	.hole {
		display: inline-grid;
		place-items: center;
		width: 3ch;
		height: 3ch;
		background-color: var(--dp-02);
		border-radius: 50%;
	}
</style>
