<script lang="ts">
	import IconText from '@components/IconText.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageTitle><a href="/">Golf Trips</a></PageTitle>

<div class="trips-container">
	{#if data.trips.length}
		<List>
			{#each data.trips as trip}
				<ListItem href={`/trips/${trip.id}/rounds`} title={trip.name}>
					<span slot="actionMenu">
						<a href={`/trips/${trip.id}/edit`} class="edit">
							<IconText name="trash" label="Edit trip" />
						</a>
					</span>
				</ListItem>
			{/each}
		</List>
	{:else}
		<p>no trips yet</p>
	{/if}

	<a href={`/trips/create`}>
		<IconText name="plus" label="Add trip" />
	</a>
</div>

<style lang="scss">
	.trips-container {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
</style>
