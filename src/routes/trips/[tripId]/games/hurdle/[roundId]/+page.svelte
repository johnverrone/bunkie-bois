<script lang="ts">
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: hurdlePlayers = Object.keys(data?.hurdle ?? {}) as Array<keyof typeof data.hurdle>;
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem href={`/trips/${data.trip.id}/games/hurdle`} label="Hurdle" />
		<BreadcrumbItem label={`${data.round?.name}`} />
	</Breadcrumbs>
	<h2>{data.round?.name} Hurdle</h2>
	<ol>
		{#each hurdlePlayers as player}
			<li>
				<span>{player}</span>
				<span>
					<span><b>Quota:</b> {data.hurdle[player]?.quota ?? 'TBD'}</span>
					<span><b>Score:</b> {data.hurdle[player]?.points}</span>
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
</style>
