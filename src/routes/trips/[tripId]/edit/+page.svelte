<script lang="ts">
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let tripName = data.trip.name ?? undefined;
	let startDate = data.trip.start_date ?? undefined;
	let endDate = data.trip.end_date ?? undefined;
</script>

<form class="edit-trip-form" method="post" action="?/updateTrip">
	<input type="hidden" name="id" value={data.trip.id} />
	<Input label="Trip Name" type="text" name="name" bind:value={tripName} />
	<Input label="Start Date" type="date" name="startDate" bind:value={startDate} block />
	<Input label="End Date" type="date" name="endDate" bind:value={endDate} block />

	{#if form?.message}<p class="error">{form.message}</p>{/if}

	<div class="button-row">
		<a href="/trips" class="cancel">Cancel</a>
		<div class="save">
			<Button type="submit" fullWidth>Save</Button>
		</div>
	</div>
</form>

<style lang="scss">
	.edit-trip-form {
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
