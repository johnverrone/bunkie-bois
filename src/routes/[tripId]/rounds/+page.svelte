<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ul>
	{#if data.rounds.length}
		{#each data.rounds as round}
			<li>
				<a href={`/${data.id}/rounds/${round.id}`}>
					<h5>{round.courseName}</h5>
				</a>
			</li>
		{/each}
	{:else}
		<p>no rounds yet</p>
	{/if}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 0 24px;
		list-style: none;

		li {
			height: 150px;
			a {
				color: inherit;
				text-decoration: none;
				width: 100%;
				height: 100%;

				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-end;

				padding: 10px;
				border-radius: 8px;

				background-color: var(--green);
			}
		}
	}
</style>
