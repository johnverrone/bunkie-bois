<script lang="ts">
	import { clickOutside } from '../../../utils/click_outside';
	import Button from '../../../components/Button.svelte';
	import Input from '../../../components/Input.svelte';
	import { players, type Player } from '../../../data/players';
	import type { PageData } from './$types';

	export let data: PageData;

	let addPlayerMode = false;
	let newName: string | undefined;
	let newHandicap: number | undefined;
	let editingPlayer: typeof data.players[number] | null;

	function addPlayer() {
		if (newName && newHandicap) {
			addPlayerMode = false;
			players.add(newName, newHandicap);
			newName = undefined;
			newHandicap = undefined;
		}
	}

	function updatePlayer(player: Player) {
		if (editingPlayer) {
			players.update(player.id, editingPlayer.name, editingPlayer.tripData);
			editingPlayer = null;
		}
	}

	function focus(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div class="player header">Handicaps</div>
<ul class="players">
	{#each data.players as player}
		<li>
			{#if editingPlayer?.id === player.id}
				<form class="player" on:submit|preventDefault={() => updatePlayer(player)}>
					<div class="name">
						<Input bind:value={editingPlayer.name}>{player.name}</Input>
					</div>
					<div class="handicap">
						<Input bind:value={editingPlayer.handicap}>{player.handicap}</Input>
					</div>
					<Button type="submit">done</Button>
				</form>
			{:else}
				<div class="player">
					<span>{player.name}</span>
					<div>
						<span>{player.handicap}</span>
						<Button on:click={() => (editingPlayer = Object.assign({}, player))}>edit</Button>
					</div>
				</div>
			{/if}
		</li>
	{/each}
</ul>

{#if addPlayerMode}
	<form
		class="new-player-form"
		on:submit|preventDefault={addPlayer}
		use:clickOutside
		on:outclick={() => (addPlayerMode = false)}
	>
		<div class="name">
			<Input type="text" placeholder="Joe Shmoe" bind:value={newName} {focus} />
		</div>
		<div class="handicap">
			<Input type="number" placeholder="20" inputmode="numeric" bind:value={newHandicap} />
		</div>
		<Button type="submit">Add</Button>
	</form>
{:else}
	<Button on:click={() => (addPlayerMode = true)}>+ Add player</Button>
{/if}

<style>
	.players {
		list-style: none;
		padding-left: 0;
	}

	.player {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0;
	}

	.header {
		font-weight: bold;
	}

	.new-player-form {
		display: flex;
		justify-content: space-between;
		gap: 8px;
	}

	.name {
		flex: 3;
	}

	.handicap {
		flex: 1;
	}
</style>
