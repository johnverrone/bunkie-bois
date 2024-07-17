<script lang="ts">
	import { goto } from '$app/navigation';
	import { linkPlayer } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import { pb } from '$lib/pocketbase';

	let { data } = $props();

	let linkPlayerMode = $state<'default' | 'linking' | 'linked'>(
		data.user.player ? 'linked' : 'default'
	);
	let linkedPlayerId = $state<string>();

	function startLinkingPlayer() {
		linkPlayerMode = 'linking';
	}

	function onLinkPlayer() {
		if (linkedPlayerId) {
			linkPlayer(linkedPlayerId);
			linkPlayerMode = 'linked';
		}
	}

	function signout() {
		pb.authStore.clear();
		goto('/', { invalidateAll: true });
	}
</script>

<List>
	{#if linkPlayerMode === 'default'}
		<Button on:click={startLinkingPlayer} variant="primary">Link Player</Button>
	{:else if linkPlayerMode === 'linking'}
		<SelectMenu
			name="linkedPlayer"
			options={data.allPlayers}
			bind:value={linkedPlayerId}
			placeholder="Select a player"
			onChange={onLinkPlayer}
		/>
	{:else if linkPlayerMode === 'linked'}
		<ListItem title="Linked Player">
			{data.allPlayers.find((p) => p.id === data.user.player)?.name}
		</ListItem>
	{/if}
	<Button onclick={signout} variant="secondary">Logout</Button>
</List>
