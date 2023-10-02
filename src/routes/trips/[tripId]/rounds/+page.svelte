<script lang="ts">
	import Button from '@components/Button.svelte';
	import IconText from '@components/IconText.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	$: sortedRounds = data.rounds.sort((a, b) =>
		a.date && b.date ? new Date(b.date).getTime() - new Date(a.date).getTime() : 0
	);
</script>

{#if data.rounds.length}
	<List>
		{#each sortedRounds as round}
			{#if data.role.isAdmin()}
				<ListItem href={`/trips/${data.trip.id}/rounds/${round.id}`} title={round.name}>
					<span slot="actionMenu" class="action-menu">
						<a href={`/trips/${data.trip.id}/rounds/${round.id}/edit`} class="edit">
							<IconText name="edit" label="Edit" />
						</a>
						<form method="post" action="?/deleteRound" use:enhance>
							<input type="hidden" name="roundId" value={round.id} />
							<Button variant="destructive" type="submit" fullWidth>
								<IconText name="trash" label="Delete" />
							</Button>
						</form>
					</span>
					<h6>{round.course.name}</h6>
					{#if round.date}
						<h6>
							{new Date(`${round.date}T00:00:00`).toLocaleDateString(undefined, {
								dateStyle: 'medium'
							})}
						</h6>
					{/if}
				</ListItem>
			{:else}
				<ListItem href={`/trips/${data.trip.id}/rounds/${round.id}`} title={round.name}>
					<h6>{round.course.name}</h6>
					{#if round.date}
						<h6>
							{new Date(`${round.date}T00:00:00`).toLocaleDateString(undefined, {
								dateStyle: 'medium'
							})}
						</h6>
					{/if}
				</ListItem>
			{/if}
		{/each}
	</List>
{:else}
	<p>no rounds yet</p>
{/if}

{#if data.role.isAdmin()}
	<a href={`/trips/${data.trip.id}/rounds/create`}>
		<IconText name="plus" label="Add round" />
	</a>
{/if}

<style lang="scss">
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
