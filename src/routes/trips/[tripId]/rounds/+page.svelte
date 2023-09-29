<script lang="ts">
	import Button from '@components/Button.svelte';
	import IconText from '@components/IconText.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;

	$: sortedRounds = data.rounds.sort(({ date: a }, { date: b }) => {
		if (a && b) return new Date(a).getTime() - new Date(b).getTime();
		return 0;
	});
</script>

{#if data.rounds.length}
	<List>
		{#each sortedRounds as round}
			<ListItem href={`/trips/${data.trip.id}/rounds/${round.id}`} title={round.name}>
				<span slot="actionMenu" class="action-menu">
					<a href={`/trips/${data.trip.id}/rounds/${round.id}/edit`} class="edit">
						<IconText name="edit" label="Edit round" />
					</a>
					<form method="post" action="?/deleteRound" style="display: inline-block" use:enhance>
						<input type="hidden" name="roundId" value={round.id} />
						<Button variant="destructive" type="submit">
							<IconText name="trash" label="Delete Round" />
						</Button>
					</form>
				</span>
				<h6>{round.course.name}</h6>
				{#if round.date}
					<h6>
						{new Date(round.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
					</h6>
				{/if}
			</ListItem>
		{/each}
	</List>
{:else}
	<p>no rounds yet</p>
{/if}

<a href={`/trips/${data.trip.id}/rounds/create`}>
	<IconText name="plus" label="Add round" />
</a>

<style lang="scss">
	.action-menu {
		display: flex;
		flex-flow: column;
		align-items: flex-start;
		gap: 16px;
	}

	.edit {
		padding: 0 6px;
	}
</style>
