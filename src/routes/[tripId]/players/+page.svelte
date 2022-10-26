<script lang="ts">
	import { players } from '../../../data/players';
	import type { PageData } from './$types';

	export let data: PageData;

	$: tripPlayers = $players
		.filter((player) => player.tripIds.includes(data.id))
		.sort((a, b) => a.handicap - b.handicap);

	let addPlayerMode = false;
	let newName: string;
	let newHandicap: number | null;

	function addPlayer() {
		if (newName && newHandicap) {
			addPlayerMode = false;
			players.add(newName, newHandicap);
			newName = '';
			newHandicap = null;
		}
	}

	function focus(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div class="player header">
	<span>Name</span>
	<span>Handicap</span>
</div>

<ul class="players">
	{#each tripPlayers as player}
		<li>
			<div class="player">
				<span>{player.name}</span>
				<span>{player.handicap}</span>
			</div>
		</li>
	{/each}
</ul>

{#if addPlayerMode}
	<form id="new-player-form" class="new-player-form" on:submit|preventDefault={addPlayer}>
		<input class="name-input" type="text" bind:value={newName} use:focus />
		<input class="handicap-input" type="number" inputmode="numeric" bind:value={newHandicap} />
		<button type="submit">Done</button>
	</form>
{:else}
	<button on:click={() => (addPlayerMode = true)}>+ Add player</button>
{/if}

<style>
	.players {
		list-style: none;
		padding-left: 0;
	}

	.player {
		display: flex;
		justify-content: space-between;
	}

	.header {
		font-weight: bold;
	}

	.new-player-form {
		display: flex;
		justify-content: space-between;
	}

	.handicap-input {
		max-width: 50px;
		flex: 1;
	}
</style>
