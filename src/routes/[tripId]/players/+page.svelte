<script lang="ts">
	import { clickOutside } from '@utils/click_outside';
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import Icon from '@components/Icon.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: players = data.tripPlayers.sort((a, b) => a.handicap - b.handicap);

	let addPlayerMode = false;
	let newName: string | undefined;
	let newHandicap: number | undefined;
	let editingPlayer: typeof data.tripPlayers[number] | null;

	function focus(el: HTMLInputElement) {
		el.focus();
	}
</script>

<div>
	<h5 class="header">Handicaps</h5>
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
						<input type="hidden" name="tripId" value={data.id} />
						<input type="hidden" name="playerId" value={player.id} />
						<div class="name">
							<Input name="name" bind:value={editingPlayer.name}>{player.name}</Input>
						</div>
						<div class="handicap">
							<Input
								type="number"
								inputmode="numeric"
								step="0.01"
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
							on:click={() => (editingPlayer = Object.assign({}, player))}
							variant="secondary"
						>
							<Icon name="edit" />
						</Button>
						<form method="post" action="?/deletePlayer" style="display: inline-block">
							<input type="hidden" name="tripId" value={data.id} />
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
		<input type="hidden" name="tripId" value={data.id} />
		<div class="name">
			<Input type="text" placeholder="Joe Shmoe" name="name" bind:value={newName} {focus} />
		</div>
		<div class="handicap">
			<Input
				type="number"
				placeholder="20"
				inputmode="numeric"
				name="handicap"
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
</style>
