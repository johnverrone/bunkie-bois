<script lang="ts">
	import { clickOutside } from '@utils/click_outside';
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import Icon from '@components/Icon.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	$: players = data.tripPlayers.sort((a, b) => a.handicap ?? 0 - (b.handicap ?? 0));

	type Player = (typeof data.tripPlayers)[number];
	type HandicappedPlayer = {
		[Key in keyof Player]: Exclude<Player[Key], null>;
	};

	let addPlayerMode = false;
	let newName: string | undefined;
	let newHandicap: number | undefined;
	let editingPlayer: HandicappedPlayer | null;

	function focus(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div>
	<h5 class="header">Handicaps</h5>
	{#if form?.message}<p class="error">{form.message}</p>{/if}
	<ul>
		{#each players as player}
			<li>
				{#if editingPlayer?.id === player.id}
					<form
						class="edit-player-form"
						method="post"
						action="?/updatePlayer"
						use:clickOutside
						on:outclick={() => (editingPlayer = null)}
					>
						<input type="hidden" name="tripId" value={data.trip.id} />
						<input type="hidden" name="playerId" value={player.id} />
						<div class="name">
							<Input name="name" bind:value={editingPlayer.name}>{player.name}</Input>
						</div>
						<div class="handicap">
							<Input
								type="number"
								inputmode="numeric"
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
						<form method="post" action="?/deletePlayer" style="display: inline-block">
							<input type="hidden" name="tripId" value={data.trip.id} />
							<input type="hidden" name="playerId" value={player.id} />
							<Button type="submit" variant="secondary">
								<Icon name="trash" />
							</Button>
						</form>
					</div>
				{/if}
			</li>
		{/each}
	</ul>
</div>

{#if addPlayerMode}
	<form
		class="new-player-form"
		method="post"
		action="?/addPlayer"
		use:clickOutside
		on:outclick={() => (addPlayerMode = false)}
	>
		<input type="hidden" name="tripId" value={data.trip.id} />
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
