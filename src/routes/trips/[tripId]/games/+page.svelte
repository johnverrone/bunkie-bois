<script lang="ts">
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';

	let { data } = $props();
</script>

<List>
	<ListItem title="Leaderboard" href={`/trips/${data.trip.id}/games/leaderboard`} />
	<ListItem title="Hurdle" href={`/trips/${data.trip.id}/games/hurdle`} />
	<ListItem title="Skins" href={`/trips/${data.trip.id}/games/skins`} />
</List>
