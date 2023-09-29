<script lang="ts">
	import IconText from '@components/IconText.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import Main from '@components/Main.svelte';
	import NavBar from '@components/NavBar.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

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
			href: `/settings`,
			label: 'Settings',
			active: $page.route.id?.startsWith('/settings') ?? false
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
							<span slot="actionMenu">
								<a href={`/trips/${trip.id}/edit`} class="edit">
									<IconText name="edit" label="Edit trip" />
								</a>
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
</style>
