<script lang="ts">
	import Button from '@components/Button.svelte';
	import IconText from '@components/IconText.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { stop_propagation } from 'svelte/internal';

	export let data: PageData;
</script>

{#if data.rounds.length}
	<List>
		{#each data.rounds as round}
			<ListItem href={`/trips/${data.trip.id}/rounds/${round.id}`} title={round.name}>
				<span slot="actionMenu">
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
						{round.date.toLocaleDateString(undefined, { dateStyle: 'medium' })}
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
