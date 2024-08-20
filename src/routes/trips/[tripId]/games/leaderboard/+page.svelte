<script lang="ts">
	import { goto } from '$app/navigation';
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import Leaderboard from '$lib/components/Leaderboard.svelte';

	let { data } = $props();

	let netScoreToggled = $state(false);

	let sortedLeaderboard = $derived(
		data.leaderboard.sort((a, b) => {
			const aScore = netScoreToggled ? a.score.gross - a.score.handicap : a.score.gross;
			const bScore = netScoreToggled ? b.score.gross - b.score.handicap : b.score.gross;
			return aScore - bScore;
		})
	);

	function onToggleParams(id: string) {
		const existingRounds = data.leaderboardRounds ?? [];
		const newRounds = existingRounds.includes(id)
			? existingRounds.filter((r) => r !== id)
			: [...existingRounds, id];
		const newSearchParams = new URLSearchParams({ rounds: newRounds.join(',') });
		goto(`?${newSearchParams.toString()}`);
	}
</script>

<div>
	<Breadcrumbs>
		<BreadcrumbItem href={`/trips/${data.trip.id}/games`} label="Games" />
		<BreadcrumbItem label="Leaderboard" />
	</Breadcrumbs>

	<div class="leaderboard-heading">
		<h2>Trip Leaderboard</h2>
		<label>
			<input type="checkbox" bind:checked={netScoreToggled} />
			Net Scores
		</label>
	</div>
	<fieldset class="round-select-container">
		<legend>Rounds to include:</legend>
		{#each data.rounds.reverse() as round}
			<div>
				<input
					type="checkbox"
					id={`${round.id}`}
					checked={data.leaderboardRounds?.includes(round.id)}
					onchange={() => onToggleParams(round.id)}
				/>
				<label for={`${round.id}`}>{round.name}</label>
			</div>
		{/each}
	</fieldset>
	<Leaderboard
		leaderboard={sortedLeaderboard.map((l) => ({
			id: l.player,
			name: l.player,
			score: netScoreToggled ? l.score.gross - l.score.handicap : l.score.gross
		}))}
	/>
</div>

<style lang="scss">
	.leaderboard-heading {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 8px;
	}

	.round-select-container {
		margin-bottom: 8px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
</style>
