<script lang="ts">
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<List>
	<ListItem title="Skins" href={`/trips/${data.trip.id}/games/skins`} />
</List>
