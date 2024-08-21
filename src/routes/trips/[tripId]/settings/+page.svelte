<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { linkPlayer, unlinkPlayer } from '$lib/api';
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

	function onUnlinkPlayer() {
		unlinkPlayer();
		linkPlayerMode = 'default';
	}

	function signout() {
		pb.authStore.clear();
		goto('/', { invalidateAll: true });
	}
</script>

<List>
	<ListItem href="/courses" title="Manage Courses" />
	<ListItem href="/trips" title="Change Trip" />
	{#if linkPlayerMode === 'default'}
		<Button onclick={startLinkingPlayer} variant="primary">Link Player</Button>
	{:else if linkPlayerMode === 'linking'}
		<SelectMenu
			name="linkedPlayer"
			options={data.allPlayers}
			bind:value={linkedPlayerId}
			placeholder="Select a player"
			onChange={onLinkPlayer}
		/>
	{:else if linkPlayerMode === 'linked'}
		<div class="linked-player">
			<span>Player:</span>
			{data.allPlayers.find((p) => p.id === data.user.player)?.name}
			<Button onclick={onUnlinkPlayer} variant="destructive-secondary">Unlink</Button>
		</div>
	{/if}
	<Button onclick={signout} variant="secondary">Logout</Button>
</List>

<style lang="scss">
	.linked-player {
		text-align: center;

		span {
			font-weight: bold;
		}
	}
</style>
