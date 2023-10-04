<script lang="ts">
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let netScoreToggled: boolean = false;

	$: sortedLeaderboard = data.leaderboard.sort((a, b) => {
		const aScore = netScoreToggled ? a.score.gross - a.score.handicap : a.score.gross;
		const bScore = netScoreToggled ? b.score.gross - b.score.handicap : b.score.gross;
		return aScore - bScore;
	});
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem label="Leaderboard" />
	</Breadcrumbs>

	<div class="leaderboard-heading">
		<h2>Leaderboard</h2>
		<label>
			<input type="checkbox" bind:checked={netScoreToggled} />
			Net Scores
		</label>
	</div>
	<ol>
		{#each sortedLeaderboard as { player, score }}
			<li>
				<span class="player-data">
					<b>{player}</b>
					<!-- <div class="holes">({holes.join(', ')})</div> -->
				</span>
				<span class="player-score">
					{netScoreToggled ? score.gross - score.handicap : score.gross}
				</span>
			</li>
		{/each}
	</ol>
</div>

<style lang="scss">
	.leaderboard-heading {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 8px;
	}

	ol {
		padding-left: 0;
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	li {
		color: unset;
		background-color: var(--dp-02);
		border-radius: 8px;

		padding-left: 16px;

		display: flex;
		justify-content: space-between;
		align-items: stretch;

		.player-data {
			padding-block: 8px;
		}

		.player-score {
			background-color: hsl(120, 80%, 50%);
			color: #121212;
			border-radius: inherit;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
			border: none;

			min-width: 5ch;

			display: grid;
			place-items: center;
			font-weight: bold;
		}
	}
</style>
