<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { interpolateHsl } from 'd3-interpolate';
	import { flip } from 'svelte/animate';
	import Input from '../../../../components/Input.svelte';
	import Button from '../../../../components/Button.svelte';
	import { getPar, getYardage } from '../../../../data/course';
	import { players, playersById } from '../../../../data/players';
	import { scores } from '../../../../data/scores';
	import type { PageData } from './$types';
	import { calculateCourseHandicap } from '../../../../utils/handicap';

	export let data: PageData;

	let newPlayer: string | undefined;
	let newScore: number | undefined;

	$: par = getPar(data.scorecard);
	$: yardage = getYardage(data.scorecard);

	let netScoreToggled: boolean = false;

	$: tripPlayers = $players
		.filter((player) => player.tripIds.includes(data.id))
		.sort((a, b) => a.handicap - b.handicap);

	$: leaderboard = $scores
		.filter((player) => player.roundId === data.round.id)
		.map((score) => ({
			...$playersById[score.playerId]!,
			score: score.score
		}))
		.sort((a, b) => a.score - b.score);

	function logScore() {
		if (newPlayer && newScore) {
			scores.set(newPlayer, data.round.id, newScore);
			newPlayer = undefined;
			newScore = undefined;
		}
	}

	const scoreScale = scaleLinear().domain([70, 150]);
	const scoreColor = (t: number) =>
		interpolateHsl('hsl(118, 80%, 50%)', 'hsl(0, 80%, 50%)')(scoreScale(t));
</script>

<nav class="breadcrumbs">
	<a href={`/${data.id}/rounds`}>Rounds</a>
	<span>{data.round.courseName}</span>
</nav>

<div class="leaderboard">
	<div class="leaderboard-heading">
		<h2>Leaderboard</h2>
		<label>
			<input type="checkbox" bind:checked={netScoreToggled} />
			Net Scores
		</label>
	</div>
	<ol class="leaderboard-list">
		{#each leaderboard as player (player.id)}
			<li class="leaderboard-list-item" animate:flip={{ duration: 200 }}>
				<span class="player-name">{player.name}</span>
				<span class="player-score" style={`--score-color: ${scoreColor(player.score)}`}>
					{netScoreToggled
						? player.score -
						  calculateCourseHandicap(
								player.handicap,
								data.scorecard.slope,
								data.scorecard.rating,
								par
						  )
						: player.score}
				</span>
			</li>
		{/each}
	</ol>
</div>

<form class="log-score-form" on:submit|preventDefault={logScore}>
	<div>
		<label for="new-score-player">Player</label>
		<select
			class="player-select"
			name="new-score-player"
			id="new-score-player"
			bind:value={newPlayer}
		>
			<option value={undefined}>Select a player</option>
			{#each tripPlayers as player}
				<option value={player.id}>{player.name}</option>
			{/each}
		</select>
	</div>
	<div>
		<label for="new-score-score">Score</label>
		<Input
			id="new-score-score"
			type="number"
			min="65"
			max="130"
			inputmode="numeric"
			bind:value={newScore}
		/>
	</div>
	<Button type="submit">Log Score</Button>
</form>

<style>
	.breadcrumbs a {
		text-decoration: none;
		color: grey;
	}

	.breadcrumbs a:hover {
		text-decoration: underline;
	}

	.breadcrumbs a::after {
		content: '/';
		margin-left: 4px;
	}

	.leaderboard {
		padding-block: 1rem;
	}

	.leaderboard-heading {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.leaderboard-list {
		padding-left: 0;
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.leaderboard-list-item {
		background-color: hsl(50deg 80% 85%);
		border-radius: 8px;

		padding: 8px;
		padding-left: 16px;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.player-name {
		font-size: 1.5rem;
	}

	.player-score {
		background-color: var(--score-color);
		border-radius: inherit;
		border: none;

		min-width: 5ch;

		font-size: 1.5rem;
		text-align: center;
	}

	.log-score-form {
		display: flex;
		gap: 20px;
		align-items: flex-end;
	}

	.log-score-form > div {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.player-select {
		height: 36px;
	}
</style>
