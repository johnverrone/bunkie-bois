<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { deleteRound } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import IconText from '$lib/components/IconText.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	let { data } = $props();

	async function handleDelete(id: string) {
		await deleteRound(id);
		invalidate(`trips:${data.trip.id}`);
	}
</script>

{#if data.rounds.length}
	<List>
		{#each data.rounds as round}
			{#if data.role.isAdmin}
				<ListItem href={`/trips/${data.trip.id}/rounds/${round.id}`} title={round.name}>
					{#snippet actionMenu()}
						<span class="action-menu">
							<a href={`/trips/${data.trip.id}/rounds/${round.id}/edit`} class="edit">
								<IconText name="edit" label="Edit" />
							</a>
							<Button onclick={() => handleDelete(round.id)} variant="destructive" fullWidth>
								<IconText name="trash" label="Delete" />
							</Button>
						</span>
					{/snippet}
					<h6>{round.expand?.course?.name}</h6>
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
					<h6>{round.expand?.course?.name}</h6>
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

{#if data.role.isAdmin}
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
	}

	.edit {
		width: 100%;
		padding: 0 6px;
	}
</style>
