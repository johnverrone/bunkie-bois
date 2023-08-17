<script lang="ts">
	import Breadcrumbs from '@components/Breadcrumbs.svelte';
	import BreadcrumbItem from '@components/BreadcrumbItem.svelte';
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import { randomGolfCourse } from '@utils/golf';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let courseName: string | undefined;
</script>

<Breadcrumbs>
	<BreadcrumbItem href={`/settings`} label="Settings" />
	<BreadcrumbItem href={`/courses`} label="Courses" />
	<BreadcrumbItem label="Create" />
</Breadcrumbs>

<form class="course-form" method="post" action="?/createCourse">
	<Input
		label="Course Name"
		type="text"
		placeholder={randomGolfCourse()}
		name="name"
		bind:value={courseName}
	/>

	{#if form?.message}<p class="error">{form.message}</p>{/if}

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
