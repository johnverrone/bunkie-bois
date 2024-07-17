<svelte:options runes={true} />

<script lang="ts">
	import { goto } from '$app/navigation';
	import { updateTrip } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

	let { data } = $props();
	let errorMessage: string | undefined;

	let name = $state(data.trip.name);
	let startDate = $state(data.trip.startDate);
	let endDate = $state(data.trip.endDate);

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		await updateTrip({
			id: data.trip.id,
			name,
			startDate,
			endDate
		});
		goto(`/trips`);
	}
</script>

<form class="edit-trip-form" onsubmit={handleSubmit}>
	<Input label="Trip Name" type="text" name="name" bind:value={name} />
	<Input label="Start Date" type="date" name="startDate" bind:value={startDate} block />
	<Input label="End Date" type="date" name="endDate" bind:value={endDate} block />

	{#if errorMessage}<p class="error">{errorMessage}</p>{/if}

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
