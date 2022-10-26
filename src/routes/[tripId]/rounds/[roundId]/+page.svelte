<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import { interpolateHsl } from 'd3-interpolate';
	import { flip } from 'svelte/animate';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { clickOutside } from '../../../../utils/click_outside';
	import { getPar, getYardage } from '../../../../data/course';
	import { players, playersById } from '../../../../data/players';
	import { scores } from '../../../../data/scores';
	import type { PageData } from './$types';

	export let data: PageData;

	let newPlayer: string | undefined;
	let newScore: number | undefined;

	$: par = getPar(data.scorecard);
	$: yardage = getYardage(data.scorecard);

	$: tripPlayers = $players
		.filter((player) => player.tripIds.includes(data.id))
		.sort((a, b) => a.handicap - b.handicap);

	$: leaderboard = $scores
		.filter((player) => player.roundId === data.round.id)
		.map((score) => ({
			id: $playersById[score.playerId]?.id,
			name: $playersById[score.playerId]?.name,
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

	let selectedScore: typeof leaderboard[number] | null;

	const scoreScale = scaleLinear().domain([70, 150]);
	const scoreColor = (t: number) =>
		interpolateHsl('hsl(118, 80%, 50%)', 'hsl(0, 80%, 50%)')(scoreScale(t));

	const [send, receive] = crossfade({
		duration: (d) => Math.sqrt(d * 200),
		easing: quintOut,
		fallback(node) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});
</script>

<nav class="breadcrumbs">
	<a href={`/${data.id}/rounds`}>Rounds</a>
	<span>{data.round.courseName}</span>
</nav>

<div class="leaderboard">
	<h2>Leaderboard</h2>
	<ol class="leaderboard-list">
		{#each leaderboard as player (player.id)}
			<li class="leaderboard-list-item" animate:flip={{ duration: 200 }}>
				<span class="player-name">{player.name}</span>
				{#if selectedScore?.id !== player.id}
					<span
						class="player-score"
						style={`--score-color: ${scoreColor(player.score)}`}
						on:click={() => (selectedScore = player)}
						in:receive={{ key: player.id }}
						out:send|local={{ key: player.id }}
					>
						{player.score}
					</span>
				{/if}
			</li>
		{/each}
	</ol>
</div>

{#if selectedScore}
	{#await selectedScore then d}
		<div
			class="edit-score"
			in:receive={{ key: d.id }}
			out:send={{ key: d.id }}
			use:clickOutside
			on:outclick={() => (selectedScore = null)}
		>
			<span class="edit-name">{selectedScore.name}</span>
			<span class="edit-score-score">{selectedScore.score}</span>
		</div>
	{/await}
{/if}

<div class="log-score-form">
	<div>
		<label for="new-score-player">Player</label>
		<select name="new-score-player" id="new-score-player" bind:value={newPlayer}>
			<option value={undefined}>Select a player</option>
			{#each tripPlayers as player}
				<option value={player.id}>{player.name}</option>
			{/each}
		</select>
	</div>
	<div>
		<label for="new-score-score">Score</label>
		<input
			id="new-score-score"
			type="number"
			min="65"
			max="130"
			inputmode="numeric"
			bind:value={newScore}
		/>
	</div>
	<button on:click={logScore}>Log Score</button>
</div>

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

		min-width: 5ch;
		padding: 16px 16px;

		font-size: 1.5rem;
		text-align: center;
	}

	.edit-score {
		position: absolute;
		background-color: hsl(200deg 60% 87%);
		border-radius: 8px;
		width: 50%;
		max-width: 400px;
		aspect-ratio: 1 / 1;

		font-size: 2rem;

		left: 0;
		right: 0;
		top: 25%;
		margin: 0 auto;

		display: grid;
		place-items: center;
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

	.log-score-form input {
		padding: 0;
	}
</style>
