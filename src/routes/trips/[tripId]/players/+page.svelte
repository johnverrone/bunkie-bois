<script lang="ts">
	import {
		addPlayerToTrip,
		createPlayer,
		deletePlayer,
		playersSchemas,
		updatePlayer
	} from '$lib/api';
	import { clickOutside } from '$lib/utils/click_outside';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { invalidate } from '$app/navigation';

	let { data } = $props();

	let sortedPlayers = $derived(
		data.tripPlayers.sort((a, b) => (a.handicap ?? 0) - (b.handicap ?? 0))
	);
	let newPlayers = $derived(
		data.allPlayers.filter((p) => data.tripPlayers.find((tp) => tp.id === p.id) === undefined)
	);

	type Player = (typeof data.tripPlayers)[number];
	type HandicappedPlayer = {
		[Key in keyof Player]: Exclude<Player[Key], null>;
	};

	let addPlayerMode = $state<'search' | 'new' | null>(null);
	let newPlayerId = $state<string>();
	let newName = $state<string>();
	let newHandicap = $state<number>();
	let editingPlayer = $state<HandicappedPlayer | null>(null);
	let errorMessage = $state<string>();

	function focus(el: HTMLInputElement) {
		el.focus();
	}

	async function handleAddPlayer(e: SubmitEvent) {
		e.preventDefault();
		if (newPlayerId && newPlayerId !== '__createNew') {
			await addPlayerToTrip(newPlayerId, data.trip.id);
		} else {
			const parseResult = playersSchemas.createPlayerSchema.safeParse({
				name: newName,
				handicap: newHandicap,
				tripId: data.trip.id
			});
			if (!parseResult.success) {
				console.error(parseResult.error);
				return;
			}

			await createPlayer(parseResult.data);
		}
		invalidate(`trips:${data.trip.id}`);
		addPlayerMode = null;
		newName = '';
		newHandicap = undefined;
		newPlayerId = undefined;
	}

	async function handleEditPlayer(e: SubmitEvent) {
		e.preventDefault();
		const parseResult = playersSchemas.updatePlayerSchema.safeParse({
			id: editingPlayer?.id,
			name: editingPlayer?.name,
			handicap: editingPlayer?.handicap
		});
		if (!parseResult.success) {
			console.error(parseResult.error);
			return;
		}

		await updatePlayer(parseResult.data);
		invalidate(`trips:${data.trip.id}`);
		editingPlayer = null;
	}

	async function handleDeletePlayer(id: string) {
		await deletePlayer(id);
		invalidate(`trips:${data.trip.id}`);
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
						onoutclick={() => (editingPlayer = null)}
						onsubmit={handleEditPlayer}
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
							/>
						</div>
						<Button type="submit">
							<Icon name="check" />
						</Button>
					</form>
				{:else}
					<span>{player.name}</span>
					<div class="edit-controls">
						<span>{player.handicap}</span>
						{#if data.role.isAdmin || data.loggedInPlayer === player.id}
							<Button
								onclick={() => (editingPlayer = Object.assign({ handicap: 0 }, player))}
								variant="secondary"
							>
								<Icon name="edit" />
							</Button>
						{/if}
						{#if data.role.isAdmin}
							<Button onclick={() => handleDeletePlayer(player.id)} variant="secondary">
								<Icon name="trash" />
							</Button>
						{/if}
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>

{#if addPlayerMode === 'search'}
	<form
		class="new-player-form"
		use:clickOutside
		onoutclick={() => (addPlayerMode = null)}
		onsubmit={handleAddPlayer}
	>
		<select
			class="player-select"
			bind:value={newPlayerId}
			onchange={() => (newPlayerId === '__createNew' ? (addPlayerMode = 'new') : null)}
		>
			<option value={undefined}>Select a player</option>
			{#each newPlayers as player}
				<option value={player.id}>{player.name}</option>
			{/each}
			<option value="__createNew">Create New</option>
		</select>
		<Button type="submit">Add</Button>
	</form>
{:else if addPlayerMode === 'new'}
	<form
		class="new-player-form"
		use:clickOutside
		onoutclick={() => (addPlayerMode = null)}
		onsubmit={handleAddPlayer}
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
	<Button onclick={() => (addPlayerMode = 'search')}>
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
		}

		.edit-controls {
			display: flex;
			align-items: center;
			gap: 1rem;
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

	.player-select {
		height: 36px;
		background-color: var(--dp-12);
		color: #fefefe;
		border: none;
		border-radius: 4px;
		padding: 2px 4px;
		outline-color: var(--primary);
		outline-style: solid;
		outline-width: 1px;
	}
</style>
