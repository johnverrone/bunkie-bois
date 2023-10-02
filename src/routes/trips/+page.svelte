<script lang="ts">
	import Button from '@components/Button.svelte';
	import IconText from '@components/IconText.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import Main from '@components/Main.svelte';
	import NavBar from '@components/NavBar.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
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
	<div class="float-bottom">
		{#if data.trips.length}
			<List>
				{#each data.trips as trip}
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
						</ListItem>
					{:else}
						<ListItem href={`/trips/${trip.id}/rounds`} title={trip.name} />
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
