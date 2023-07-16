<script lang="ts">
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem label="Skins" />
	</Breadcrumbs>

	<h3>By Round</h3>
	<ol>
		{#each data.rounds as round}
			<li><a href={`/trips/${data.trip.id}/games/skins/${round.id}`}>{round.name}</a></li>
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
