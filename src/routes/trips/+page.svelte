<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconText from '$lib/components/IconText.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Main from '$lib/components/Main.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';
	import { deleteTrip } from '$lib/api';
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	let deleteError: string | undefined;

	$: sortedTrips = data.trips.ok
		? data.trips.data.sort((a, b) =>
				a.endDate && b.endDate ? new Date(b.endDate).getTime() - new Date(a.endDate).getTime() : 0
		  )
		: [];

	async function handleDelete(id: string) {
		const response = await deleteTrip(id);
		if (!response.ok) {
			deleteError = 'There was an error deleting trip.';
			return;
		}
		invalidate('trips');
	}

	$: fetchError = !data.trips.ok && 'There was an error fetching trips.';
	$: emptyError = sortedTrips.length < 1 && 'No trips yet.';
	$: errorMessage = fetchError || deleteError || emptyError;
</script>

<PageTitle>Golf Trips</PageTitle>

<NavBar
	items={[
		{
			href: `/trips`,
			label: 'Trips',
			active: $page.route.id?.startsWith('/trips') ?? false
		},
		{
			href: `/courses`,
			label: 'Courses',
			active: $page.route.id?.startsWith('/courses') ?? false
		}
	]}
/>

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
								<span slot="actionMenu" class="action-menu">
									<a href={`/trips/${trip.id}/edit`} class="edit">
										<IconText name="edit" label="Edit" />
									</a>
									<Button
										variant="destructive"
										type="submit"
										fullWidth
										on:click={() => handleDelete(trip.id)}
									>
										<IconText name="trash" label="Delete" />
									</Button>
								</span>
								{#if trip.startDate && trip.endDate}
									<h6>
										{new Date(`${trip.startDate}T00:00:00`).toLocaleDateString(undefined, {
											dateStyle: 'medium'
										})} -
										{new Date(`${trip.endDate}T00:00:00`).toLocaleDateString(undefined, {
											dateStyle: 'medium'
										})}
									</h6>
								{/if}
							</ListItem>
						{:else}
							<ListItem href={`/trips/${trip.id}/rounds`} title={trip.name}>
								{#if trip.startDate && trip.endDate}
									<h6>
										{new Date(`${trip.startDate}T00:00:00`).toLocaleDateString(undefined, {
											dateStyle: 'medium'
										})} -
										{new Date(`${trip.endDate}T00:00:00`).toLocaleDateString(undefined, {
											dateStyle: 'medium'
										})}
									</h6>
								{/if}
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
