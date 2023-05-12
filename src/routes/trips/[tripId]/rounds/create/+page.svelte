<script lang="ts">
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import type { ActionData, PageData } from './$types';
	import { randomGolfCourse } from '@utils/golf';

	export let data: PageData;
	export let form: ActionData;

	let tripName: string | undefined;
	let courseId: number | undefined;
	let date: string | undefined;
</script>

<form class="round-form" method="post" action="?/createRound">
	<input type="hidden" name="tripId" value={data.trip.id} />
	<div class="name">
		<Input type="text" placeholder={randomGolfCourse()} name="name" bind:value={tripName} />
	</div>

	<Input type="number" name="courseId" bind:value={courseId} />
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
	}
</style>
