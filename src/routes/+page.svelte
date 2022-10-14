<script lang="ts">
	import { trips } from '../data/trips';
</script>

<h1>Golf Trips</h1>

{#each trips as trip}
	<a href={`/${trip.id}/rounds`}>{trip.name}</a>
{/each}
