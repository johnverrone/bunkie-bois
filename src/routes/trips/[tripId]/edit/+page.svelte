<script lang="ts">
	import Button from '@components/Button.svelte';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let tripName = data.trip.name;
	let startDate = data.trip.start_date;
	let endDate = data.trip.end_date;
</script>

<form class="edit-trip-form" method="post" action="?/updateTrip">
	<input type="hidden" name="id" value={data.trip.id} />
	<input type="text" name="name" bind:value={tripName} />
	<input type="date" name="startDate" bind:value={startDate} />
	<input type="date" name="endDate" bind:value={endDate} />

	{#if form?.message}<p class="error">{form.message}</p>{/if}

	<div class="button-row">
		<a href="/trips" class="cancel">Cancel</a>
		<Button type="submit" flexGrow>Save</Button>
	</div>
</form>

<style lang="scss">
	.edit-trip-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;

		.button-row {
			width: 100%;
			display: flex;
			align-items: center;
			gap: 16px;

			.cancel {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
