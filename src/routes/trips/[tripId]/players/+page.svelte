<script lang="ts">
	import { createPlayer, deletePlayer, playersSchemas, updatePlayer } from '$lib/api';
	import { clickOutside } from '$lib/utils/click_outside';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import type { PageData } from './$types';
	import { invalidate } from '$app/navigation';

	export let data: PageData;

	$: sortedPlayers = data.tripPlayers.sort((a, b) => (a.handicap ?? 0) - (b.handicap ?? 0));

	type Player = (typeof data.tripPlayers)[number];
	type HandicappedPlayer = {
		[Key in keyof Player]: Exclude<Player[Key], null>;
	};

	let addPlayerMode = false;
	let newName: string | undefined;
	let newHandicap: number | undefined;
	let editingPlayer: HandicappedPlayer | null;
	let errorMessage: string | undefined;

	function focus(el: HTMLInputElement) {
		el.focus();
	}

	function handleAddPlayer() {
		const parseResult = playersSchemas.createPlayerSchema.safeParse({
			name: newName,
			handicap: newHandicap,
			tripId: data.trip.id
		});
		if (!parseResult.success) {
			console.error(parseResult.error);
			return;
		}

		createPlayer(parseResult.data);
		invalidate(`trips/${data.trip.id}`);
		addPlayerMode = false;
	}

	function handleEditPlayer() {
		const parseResult = playersSchemas.updatePlayerSchema.safeParse({
			id: editingPlayer?.id,
			name: editingPlayer?.name,
			handicap: editingPlayer?.handicap
		});
		if (!parseResult.success) {
			console.error(parseResult.error);
			return;
		}

		updatePlayer(parseResult.data);
		invalidate(`trips/${data.trip.id}`);
		editingPlayer = null;
	}

	function handleDeletePlayer(id: string) {
		deletePlayer(id);
		invalidate(`trips/${data.trip.id}`);
	}
</script>

<div>
	<h5 class="header">Handicaps</h5>
	{#if errorMessage}<p class="error">{errorMessage}</p>{/if}
	<ul>
		{#each sortedPlayers as player}
			<li>
				{#if editingPlayer?.id === player.id}
					<form
						class="edit-player-form"
						use:clickOutside
						on:outclick={() => (editingPlayer = null)}
						on:submit|preventDefault={handleEditPlayer}
					>
						<div class="name">
							<Input name="name" bind:value={editingPlayer.name}>{player.name}</Input>
						</div>
						<div class="handicap">
							<Input
								type="number"
								inputmode="decimal"
								step="0.1"
								name="handicap"
								bind:value={editingPlayer.handicap}
							>
								{player.handicap}
							</Input>
						</div>
						<Button type="submit">
							<Icon name="check" />
						</Button>
					</form>
				{:else}
					<span>{player.name}</span>
					<div class="edit-controls">
						<span>{player.handicap}</span>
						<Button
							on:click={() => (editingPlayer = Object.assign({ handicap: 0 }, player))}
							variant="secondary"
						>
							<Icon name="edit" />
						</Button>
						<Button on:click={() => handleDeletePlayer(player.id)} variant="secondary">
							<Icon name="trash" />
						</Button>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>

{#if addPlayerMode}
	<form
		class="new-player-form"
		use:clickOutside
		on:outclick={() => (addPlayerMode = false)}
		on:submit|preventDefault={handleAddPlayer}
	>
		<div class="name">
			<Input type="text" placeholder="Joe Shmoe" name="name" bind:value={newName} {focus} />
		</div>
		<div class="handicap">
			<Input
				type="number"
				inputmode="decimal"
				step="0.1"
				name="handicap"
				placeholder="20"
				bind:value={newHandicap}
			/>
		</div>
		<Button type="submit">Add</Button>
	</form>
{:else}
	<Button on:click={() => (addPlayerMode = true)}>
		<div class="button-contents">
			<Icon name="plus" />
			Add player
		</div>
	</Button>
{/if}

<style lang="scss">
	ul {
		list-style: none;
		padding-left: 0;

		li,
		.edit-player-form {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 0;
			gap: 8px;
			width: 100%;

			.name {
				flex: 3;
			}

			.handicap {
				flex: 1;
			}

			.edit-controls {
				display: flex;
				align-items: center;
				gap: 1rem;
			}
		}
	}

	.header {
		font-weight: bold;
	}

	.button-contents {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.new-player-form {
		display: flex;
		justify-content: space-between;
		gap: 8px;

		.name {
			flex: 3;
		}

		.handicap {
			flex: 1;
		}
	}

	.error {
		color: red;
	}
</style>
