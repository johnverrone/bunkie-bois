<svelte:options runes={true} />

<script lang="ts">
	import { goto } from '$app/navigation';
	import { createTrip, tripsSchemas } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Main from '$lib/components/Main.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';

	let name = $state<string>();
	let startDate = $state<string>();
	let endDate = $state<string>();
	let errorMessage = $state<string>();

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const parseResult = tripsSchemas.createTripSchema.safeParse({ name, startDate, endDate });
		if (!parseResult.success) {
			errorMessage = 'Invalid trip information.';
			return;
		}

		const trip = await createTrip(parseResult.data);
		goto(`/trips/${trip.id}/rounds`);
	}
</script>

<PageTitle>Create Trip</PageTitle>

<Main>
	<form class="round-form" onsubmit={handleSubmit}>
		<Input
			label="Trip Name"
			type="text"
			placeholder="Myrtle Beach 2023"
			name="name"
			bind:value={name}
		/>
		<Input label="Start Date" type="date" name="startDate" bind:value={startDate} block />
		<Input label="End Date" type="date" name="endDate" bind:value={endDate} block />

		{#if errorMessage}<p class="error">{errorMessage}</p>{/if}

		<div class="button-row">
			<a href={`/trips`} class="cancel">Cancel</a>
			<div class="save">
				<Button type="submit" fullWidth>Save</Button>
			</div>
		</div>
	</form>
</Main>

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
