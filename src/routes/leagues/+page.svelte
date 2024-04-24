<script lang="ts">
	import IconText from '$lib/components/IconText.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import Main from '$lib/components/Main.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { delayedNavigation } from '$lib/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageTitle>Golf Leagues</PageTitle>

<Main>
	{#if $delayedNavigation}
		<Loading />
	{/if}
	<div class="float-bottom">
		<div>
			{#if data.leagues.length}
				<List>
					{#each data.leagues as l}
						<ListItem href={`/leagues/${l.id}`} title={l.name} />
					{/each}
				</List>
			{/if}
		</div>

		{#if data.role.isAdmin}
			<a href={`/leagues/create`}>
				<IconText name="plus" label="Create league" />
			</a>
		{/if}
	</div>
</Main>

<style lang="scss">
	.float-bottom {
		height: 100%;
		display: grid;
		grid-template-rows: 1fr auto;
	}
</style>
