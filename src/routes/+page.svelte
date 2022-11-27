<script lang="ts">
	import { trips } from '../data/trips';
</script>

<h1>Golf Trips</h1>

<ul>
	{#each trips as trip}
		<a href={`/${trip.id}/rounds`}>{trip.name}</a>
	{/each}
</ul>

<style lang="scss">
	ul {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
