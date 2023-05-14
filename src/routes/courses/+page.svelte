<script lang="ts">
	import PageTitle from '@components/PageTitle.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PageTitle><a href="/">Courses</a></PageTitle>

<ul>
	{#if data.courses.length}
		{#each data.courses as course}
			<li><a href={`/courses/${course.id}`}>{course.name}</a></li>
		{/each}
	{:else}
		<p>no courses yet</p>
	{/if}
</ul>
