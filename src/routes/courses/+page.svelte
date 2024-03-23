<script lang="ts">
	import IconText from '$lib/components/IconText.svelte';
	import List from '$lib/components/List.svelte';
	import ListItem from '$lib/components/ListItem.svelte';
	import type { PageData } from './$types';

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
