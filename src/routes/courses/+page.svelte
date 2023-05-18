<script lang="ts">
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import Main from '@components/Main.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageTitle>Courses</PageTitle>

<Main>
	<Breadcrumbs>
		<BreadcrumbItem href={`/settings`} label="Settings" />
		<BreadcrumbItem label="Courses" />
	</Breadcrumbs>

	{#if data.courses.length}
		<List>
			{#each data.courses as course}
				<ListItem href={`/courses/${course.id}`} title={course.name} />
			{/each}
		</List>
	{:else}
		<p>no courses yet</p>
	{/if}
</Main>
