<script lang="ts">
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import BreadcrumbItem from '$lib/components/BreadcrumbItem.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { randomGolfCourse } from '$lib/utils/golf';
	import { createCourse } from '$lib/api';
	import { goto } from '$app/navigation';

	let courseName: string | undefined;
	let errorMessage: string | undefined;

	async function handleSubmit() {
		if (!courseName) return;
		const response = await createCourse(courseName);
		if (!response.ok) {
			errorMessage = 'There was an error creating the course.';
			return;
		}

		goto('/courses');
	}
</script>

<Breadcrumbs>
	<BreadcrumbItem href={`/settings`} label="Settings" />
	<BreadcrumbItem href={`/courses`} label="Courses" />
	<BreadcrumbItem label="Create" />
</Breadcrumbs>

<form class="course-form" on:submit|preventDefault={handleSubmit}>
	<Input
		label="Course Name"
		type="text"
		placeholder={randomGolfCourse()}
		name="name"
		bind:value={courseName}
		required
	/>

	{#if errorMessage}<p class="error">{errorMessage}</p>{/if}

	<div class="button-row">
		<a href={`/courses`} class="cancel">Cancel</a>
		<div class="save">
			<Button type="submit" fullWidth>Save</Button>
		</div>
	</div>
</form>

<style lang="scss">
	.course-form {
		display: flex;
		flex-direction: column;
		gap: 8px;

		.button-row {
			margin-top: 16px;
			display: flex;
			align-items: center;
			gap: 16px;

			.cancel,
			.save {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
