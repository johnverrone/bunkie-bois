<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<ul>
	{#each data.players as player}
		<li>
			<div class="player">
				<span>{player.name}</span>
				<span>{player.handicap}</span>
			</div>
		</li>
	{/each}
</ul>
