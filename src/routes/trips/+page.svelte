<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconText from '$lib/components/IconText.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Main from '$lib/components/Main.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';

	export let data: PageData;

	$: sortedTrips = data.trips.sort((a, b) =>
		a.end_date && b.end_date ? new Date(b.end_date).getTime() - new Date(a.end_date).getTime() : 0
	);
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
		{#if sortedTrips.length}
			<List>
				{#each sortedTrips as trip}
					{#if data.role.isAdmin()}
						<ListItem href={`/trips/${trip.id}/rounds`} title={trip.name}>
							<span slot="actionMenu" class="action-menu">
								<a href={`/trips/${trip.id}/edit`} class="edit">
									<IconText name="edit" label="Edit" />
								</a>
								<form method="post" action="?/deleteTrip" use:enhance>
									<input type="hidden" name="tripId" value={trip.id} />
									<Button variant="destructive" type="submit" fullWidth>
										<IconText name="trash" label="Delete" />
									</Button>
								</form>
							</span>
							{#if trip.start_date && trip.end_date}
								<h6>
									{new Date(`${trip.start_date}T00:00:00`).toLocaleDateString(undefined, {
										dateStyle: 'medium'
									})} -
									{new Date(`${trip.end_date}T00:00:00`).toLocaleDateString(undefined, {
										dateStyle: 'medium'
									})}
								</h6>
							{/if}
						</ListItem>
					{:else}
						<ListItem href={`/trips/${trip.id}/rounds`} title={trip.name}>
							{#if trip.start_date && trip.end_date}
								<h6>
									{new Date(`${trip.start_date}T00:00:00`).toLocaleDateString(undefined, {
										dateStyle: 'medium'
									})} -
									{new Date(`${trip.end_date}T00:00:00`).toLocaleDateString(undefined, {
										dateStyle: 'medium'
									})}
								</h6>
							{/if}
						</ListItem>
					{/if}
				{/each}
			</List>
		{:else}
			<p>
				no trips yet.
				{#if !data.role.isAdmin()}
					only an admin can create trips.
				{/if}
			</p>
		{/if}

		{#if data.role.isAdmin()}
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

		form {
			width: 100%;
		}
	}

	.edit {
		width: 100%;
		padding: 0 6px;
	}
</style>
