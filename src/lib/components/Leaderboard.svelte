<script lang="ts" generics="T extends { id: string, name: string, teeBox?: string, score: number }">
	import { flip } from 'svelte/animate';
	import { scaleLinear } from 'd3-scale';
	import { interpolateHsl } from 'd3-interpolate';

	interface LeaderboardProps<T> {
		leaderboard: T[];
		href?: ((entry: T) => string) | null;
	}

	let { leaderboard, href = null }: LeaderboardProps<T> = $props();

	let scores = $derived(leaderboard.map((l) => l.score));

	let scoreScale = $derived(
		scaleLinear().domain([Math.min(...scores) - 20, Math.max(...scores) + 30])
	);
	let scoreColor = $derived((t: number) =>
		interpolateHsl('hsl(120, 80%, 50%)', 'hsl(0, 80%, 50%)')(scoreScale(t))
	);
</script>

<ol class="leaderboard-list">
	{#each leaderboard as l (l.id)}
		<li animate:flip={{ duration: 200 }}>
			{#if href}
				<a href={href(l)} class="item">
					<span class="player-name">
						{l.name}
						{#if !!l.teeBox}<span class="tee-box-badge">{l.teeBox}</span>{/if}
					</span>
					<span class="player-score" style={`--score-color: ${scoreColor(l.score)}`}>
						{l.score}
					</span>
				</a>
			{:else}
				<div class="item">
					<span class="player-name">
						{l.name}
						{#if !!l.teeBox}<span class="tee-box-badge">{l.teeBox}</span>{/if}
					</span>
					<span class="player-score" style={`--score-color: ${scoreColor(l.score)}`}>
						{l.score}
					</span>
				</div>
			{/if}
		</li>
	{/each}
</ol>

<style lang="scss">
	.leaderboard-list {
		padding-left: 0;
		list-style: none;

		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.item {
		color: unset;
		background-color: var(--dp-02);
		border-radius: 8px;

		padding-left: 16px;

		display: flex;
		justify-content: space-between;
		align-items: center;

		&:hover {
			text-decoration: none;
			background-color: var(--dp-01);
		}
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
</style>
