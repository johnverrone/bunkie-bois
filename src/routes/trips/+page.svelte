<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconText from '$lib/components/IconText.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Main from '$lib/components/Main.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';
	import { deleteTrip } from '$lib/api';
	import { invalidate } from '$app/navigation';
	import type { TimeRange } from '$lib/types';

	let { data } = $props();

	let deleteError = $state<string>();

	let sortedTrips = $derived(
		data.trips.sort((a, b) =>
			a.endDate && b.endDate ? new Date(b.endDate).getTime() - new Date(a.endDate).getTime() : 0
		)
	);

	async function handleDelete(id: string) {
		try {
			const success = await deleteTrip(id);
			if (!success) throw new Error();
			invalidate('trips');
		} catch (e) {
			deleteError = 'There was an error deleting the trip.';
		}
	}

	let emptyError = $derived(sortedTrips.length < 1 && 'No trips yet.');
	let errorMessage = $derived(deleteError || emptyError);
</script>

<PageTitle>Golf Trips</PageTitle>

<Main>
	{#if $delayedNavigation}
		<Loading />
	{/if}
	<div class="float-bottom">
		<div>
			{#if sortedTrips.length}
				<List>
					{#each sortedTrips as trip}
						{#if data.role.isAdmin}
							<ListItem href={`/trips/${trip.id}/rounds`} title={trip.name}>
								{#snippet actionMenu()}
									<span class="action-menu">
										<a href={`/trips/${trip.id}/edit`} class="edit">
											<IconText name="edit" label="Edit" />
										</a>
										<Button
											variant="destructive"
											type="submit"
											fullWidth
											onclick={() => handleDelete(trip.id)}
										>
											<IconText name="trash" label="Delete" />
										</Button>
									</span>
								{/snippet}
								{@render date(trip)}
							</ListItem>
						{:else}
							<ListItem href={`/trips/${trip.id}/rounds`} title={trip.name}>
								{@render date(trip)}
							</ListItem>
						{/if}
					{/each}
				</List>
			{/if}

			{#if errorMessage}
				<p>{errorMessage}</p>
			{/if}
		</div>

		{#if data.role.isAdmin}
			<a href={`/trips/create`}>
				<IconText name="plus" label="Add trip" />
			</a>
		{/if}
	</div>
</Main>

{#snippet date({ startDate, endDate }: TimeRange)}
	{#if startDate && endDate}
		<h6>
			{new Date(`${startDate}T00:00:00`).toLocaleDateString(undefined, {
				dateStyle: 'medium'
			})} -
			{new Date(`${endDate}T00:00:00`).toLocaleDateString(undefined, {
				dateStyle: 'medium'
			})}
		</h6>
	{/if}
{/snippet}

<style lang="scss">
	.float-bottom {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}

	.action-menu {
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		gap: 16px;
		min-width: 100px;
	}

	.edit {
		width: 100%;
		padding: 0 6px;
	}
</style>
