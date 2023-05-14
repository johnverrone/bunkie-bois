<script lang="ts">
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let roundName: string | undefined;
	let courseId: number | undefined;
	let date: string | undefined;
</script>

<form class="round-form" method="post" action="?/createRound">
	<input type="hidden" name="tripId" value={data.trip.id} />
	<div class="name">
		<Input type="text" placeholder={'round name'} name="name" bind:value={roundName} />
	</div>

	<select class="course-select" name="courseId" id="course-select" bind:value={courseId}>
		<option value={undefined}>Select a course</option>
		{#each data.courses as course}
			<option value={course.id}>{course.name}</option>
		{/each}
	</select>

	<Input type="date" name="date" bind:value={date} />

	{#if form?.message}<p class="error">{form.message}</p>{/if}

	<div class="button-row">
		<a href={`/trips/${data.trip.id}/rounds`} class="cancel">Cancel</a>
		<div class="save">
			<Button type="submit" fullWidth>Save</Button>
		</div>
	</div>
</form>

<style lang="scss">
	.round-form {
		display: flex;
		flex-direction: column;
		gap: 8px;

		.button-row {
			display: flex;
			align-items: center;

			* {
				flex: 1;
				text-align: center;
			}
		}

		.course-select {
			height: 36px;
			background-color: var(--dp-12);
			color: #fefefe;
			border: none;
			border-radius: 4px;
			padding: 2px 4px;
			outline-color: var(--primary);
			outline-style: solid;
			outline-width: 1px;
		}
	}
</style>
