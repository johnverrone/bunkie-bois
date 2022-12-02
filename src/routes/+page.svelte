<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<h3 class="title">Golf Trips</h3>

<ul>
	{#if data.trips.length}
		{#each data.trips as trip}
			<li>
				<a href={`/${trip.id}/rounds`}><h5>{trip.name}</h5></a>
			</li>
		{/each}
	{:else}
		<p>no trips yet</p>
	{/if}
</ul>

<style lang="scss">
	.title {
		padding: 24px 0;
	}

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
