<script lang="ts">
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	let data = $props();

	let hurdlePlayers = $derived(
		[...(data.hurdle?.keys() ?? [])].sort(
			(a, b) => (data.hurdle?.get(b)?.points ?? 0) - (data.hurdle?.get(a)?.points ?? 0)
		)
	);
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
					<span><b>Quota:</b> {data.hurdle?.get(player)?.quota ?? 'TBD'}</span>
					<span><b>Score:</b> {data.hurdle?.get(player)?.points}</span>
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
