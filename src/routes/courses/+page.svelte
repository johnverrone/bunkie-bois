<script lang="ts">
	import List from '@components/List.svelte';
	import ListItem from '@components/ListItem.svelte';
	import type { PageData } from './$types';
	import IconText from '@components/IconText.svelte';

	export let data: PageData;

	$: sortedCourses = data.courses.sort();
</script>

{#if sortedCourses.length}
	<List>
		{#each sortedCourses as course}
			<ListItem href={`/courses/${course.id}`} title={course.name} />
		{/each}
	</List>
{:else}
	<p>no courses yet</p>
{/if}

<a class="add-course-button" href={`/courses/create`}>
	<IconText name="plus" label="Add course" />
</a>

<style lang="scss">
	.add-course-button {
		display: block;
		margin-top: 1rem;
	}
</style>
