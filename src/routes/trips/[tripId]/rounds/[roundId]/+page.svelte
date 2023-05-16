<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { interpolateHsl } from 'd3-interpolate';
	import { flip } from 'svelte/animate';
	import type { PageData } from './$types';
	import Icon from '@components/Icon.svelte';
	import { slide } from 'svelte/transition';

	export let data: PageData;

	let newPlayerId: number | undefined;

	let showDetails = false;
	function toggleDetails() {
		showDetails = !showDetails;
	}

	let netScoreToggled: boolean = false;

	$: sortedLeaderboard = data.leaderboard.sort((a, b) => {
		const aScore = netScoreToggled ? a.score - a.courseHandicap : a.score;
		const bScore = netScoreToggled ? b.score - b.courseHandicap : b.score;
		return aScore - bScore;
	});

	$: scorelessPlayers = data.tripPlayers.filter(
		(player) => data.leaderboard.find((leaderboard) => leaderboard.id === player.id) === undefined
	);

	const scoreScale = scaleLinear().domain([70, 150]);
	const scoreColor = (t: number) =>
		interpolateHsl('hsl(120, 80%, 50%)', 'hsl(0, 80%, 50%)')(scoreScale(t));
</script>

<div>
	<nav class="breadcrumbs">
		<span class="crumb">
			<a href={`/trips/${data.trip.id}/rounds`}>Rounds</a>
		</span>
		<span>{data.round.name}</span>
	</nav>

	<div class="round-details">
		<button class="toggle" on:click={toggleDetails}>
			{#if showDetails}<Icon name="arrow-up" />{:else}<Icon name="arrow-down" />{/if}
		</button>
		<h5>Round Details</h5>
		{#if showDetails}
			<div transition:slide={{ duration: 300 }}>
				<p>Date: {data.round.date?.toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
				<p>Course: {data.round.course.name}</p>
			</div>
		{/if}
	</div>

	<div class="leaderboard">
		<div class="leaderboard-heading">
			<h2>Leaderboard</h2>
			<label>
				<input type="checkbox" bind:checked={netScoreToggled} />
				Net Scores
			</label>
		</div>
		<ol class="leaderboard-list">
			{#each sortedLeaderboard as player (player.id)}
				<li class="leaderboard-list-item" animate:flip={{ duration: 200 }}>
					<span class="player-name">
						{player.name}
						<span class="tee-box-badge">{player.teeBox}</span>
					</span>
					<span class="player-score" style={`--score-color: ${scoreColor(player.score)}`}>
						{netScoreToggled ? player.score - player.courseHandicap : player.score}
					</span>
				</li>
			{/each}
		</ol>
	</div>
</div>

<div class="log-score-form">
	<div class="player-column">
		<label for="new-score-player">Player</label>
		<select
			class="player-select"
			name="new-score-player"
			id="new-score-player"
			bind:value={newPlayerId}
		>
			<option value={undefined}>Select a player</option>
			{#each scorelessPlayers as player}
				<option value={player.id}>{player.name}</option>
			{/each}
		</select>
	</div>
	<a
		href={`/trips/${data.trip.id}/rounds/${data.round.id}/players/${newPlayerId}/scorecard`}
		class="log-score-button"
		class:disabled={!newPlayerId}
	>
		Log Score
	</a>
</div>

<style lang="scss">
	.breadcrumbs .crumb {
		color: grey;

		a {
			text-decoration: none;
			color: inherit;

			&:hover {
				text-decoration: underline;
			}
		}

		&::after {
			content: '/';
			margin-left: 4px;
		}
	}

	.round-details {
		position: relative;
		margin-top: 10px;
		padding: 10px 16px;
		background-color: var(--dp-01);
		border-radius: 8px;

		.toggle {
			color: inherit;
			position: absolute;
			top: 15px;
			right: 16px;
		}
	}

	.leaderboard {
		padding-block: 10px;
	}

	.leaderboard-heading {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 8px;
	}

	.leaderboard-list {
		padding-left: 0;
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.leaderboard-list-item {
		background-color: var(--dp-02);
		border-radius: 8px;

		padding-left: 16px;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.player-name {
		font-size: 1rem;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 16px;
	}

	.tee-box-badge {
		font-size: 0.75rem;
		font-style: italic;
	}

	.player-score {
		background-color: var(--score-color);
		color: #121212;
		border-radius: inherit;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border: none;

		min-width: 5ch;
		padding: 8px 0;

		text-align: center;
		font-weight: bold;
	}

	.log-score-form {
		display: flex;
		gap: 20px;
		align-items: flex-end;

		.player-column {
			flex: 3;
		}

		.log-score-button {
			line-height: 36px;

			&.disabled {
				pointer-events: none;
				color: var(--disabled);
			}
		}
	}

	.log-score-form > div {
		flex: 1;
		display: flex;
		flex-direction: column;
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
