<script lang="ts">
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import SelectMenu from '@components/SelectMenu.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let roundName: string | undefined;
	let courseId: number | undefined;
	let date: string | undefined;
</script>

<form class="round-form" method="post" action="?/createRound">
	<input type="hidden" name="tripId" value={data.trip.id} />
	<Input label="Round Name" type="text" placeholder="Round 1" name="name" bind:value={roundName} />
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
	.round-form {
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
