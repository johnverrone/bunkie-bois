<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let roundName = data.round.name ?? undefined;
	let courseId = data.round.course.id ?? undefined;
	let date = data.round.date ?? undefined;
</script>

<form class="edit-round-form" method="post" action="?/updateRound">
	<input type="hidden" name="id" value={data.round.id} />
	<Input label="Round Name" type="text" name="name" bind:value={roundName} />
	<SelectMenu label="Course" name="courseId" bind:value={courseId} options={data.courses} />
	<Input label="Date" type="date" name="date" bind:value={date} block />

	{#if form?.message}<p class="error">{form.message}</p>{/if}

	<div class="button-row">
		<a href={`/trips/${data.trip.id}/rounds`} class="cancel">Cancel</a>
		<div class="save">
			<Button type="submit" fullWidth>Save</Button>
		</div>
	</div>
</form>

<style lang="scss">
	.edit-round-form {
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
