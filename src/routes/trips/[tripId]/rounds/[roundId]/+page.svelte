<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { slide } from 'svelte/transition';
	import { getScore } from '$lib/utils/scores';
	import Leaderboard from '$lib/components/Leaderboard.svelte';

	let { data } = $props();

	let newPlayerId = $state<number>();
	let netScoreToggled = $state(false);
	let showDetails = $state(false);

	let date = $derived(data.round.date ? new Date(`${data.round.date}T00:00:00`) : undefined);

	let sortedLeaderboard = $derived(
		data.leaderboard.sort((a, b) => {
			const aScore = netScoreToggled
				? getScore(a.expand?.holeScores_via_scorecard) - a.playerHandicap
				: getScore(a.expand?.holeScores_via_scorecard);
			const bScore = netScoreToggled
				? getScore(b.expand?.holeScores_via_scorecard) - b.playerHandicap
				: getScore(b.expand?.holeScores_via_scorecard);
			return aScore - bScore;
		})
	);

	let scorelessPlayers = $derived(
		data.tripPlayers.filter(
			(player) =>
				data.leaderboard.find((scorecard) => scorecard.expand?.player?.id === player.id) ===
				undefined
		)
	);

	function toggleDetails() {
		showDetails = !showDetails;
	}
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/rounds`} label="Rounds" />
		<BreadcrumbItem label={data.round.name} />
	</Breadcrumbs>

	<div class="round-details">
		<button class="toggle" onclick={toggleDetails}>
			{#if showDetails}<Icon name="arrow-up" />{:else}<Icon name="arrow-down" />{/if}
		</button>
		<h5>Round Details</h5>
		{#if showDetails}
			<div transition:slide|global={{ duration: 300 }}>
				<p>Date: {date?.toLocaleDateString(undefined, { dateStyle: 'medium' })}</p>
				<p>Course: {data.round.expand?.course?.name}</p>
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
		<Leaderboard
			leaderboard={sortedLeaderboard.map((l) => ({
				...l,
				name: l.expand?.player?.name ?? 'unknown',
				teeBox: l.expand?.teeBox?.name,
				score: netScoreToggled
					? getScore(l.expand?.holeScores_via_scorecard) - l.playerHandicap
					: getScore(l.expand?.holeScores_via_scorecard)
			}))}
			href={(l) =>
				`/trips/${data.trip.id}/rounds/${data.round.id}/players/${l.expand?.player?.id}/scorecard`}
		/>
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
		href={`/trips/${data.trip.id}/rounds/${data.round.id}/players/${newPlayerId}/scorecard/edit`}
		class="log-score-button"
		class:disabled={!newPlayerId}
	>
		Log Score
	</a>
</div>

<style lang="scss">
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
