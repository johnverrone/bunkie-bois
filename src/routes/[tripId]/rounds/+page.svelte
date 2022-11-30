<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ul class="rounds">
	{#if data.rounds.length}
		{#each data.rounds as round}
			<li class="round">
				<a href={`/${data.id}/rounds/${round.id}`}>
					{round.courseName}
				</a>
			</li>
		{/each}
	{:else}
		<p>no rounds yet</p>
	{/if}
</ul>

<style>
	.rounds {
		padding-left: 0;
		list-style: none;

		display: grid;
		grid-gap: 1rem;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	}

	.round {
		height: 80px;
		border-radius: 8px;

		background-color: hsl(156deg 47% 65%);
		color: hsl(0deg 0% 0%);
	}

	.round a {
		color: inherit;
		text-decoration: none;
		width: 100%;
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
