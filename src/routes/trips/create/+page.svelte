<script lang="ts">
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import PageTitle from '@components/PageTitle.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let tripName: string | undefined;
	let startDate: string | undefined;
	let endDate: string | undefined;
</script>

<PageTitle>Create Trip</PageTitle>

<form class="round-form" method="post" action="?/createTrip">
	<Input
		label="Trip Name"
		type="text"
		placeholder="Myrtle Beach 2023"
		name="name"
		bind:value={tripName}
	/>
	<Input label="Start Date" type="date" name="startDate" bind:value={startDate} />
	<Input label="End Date" type="date" name="endDate" bind:value={endDate} />

	{#if form?.message}<p class="error">{form.message}</p>{/if}

	<div class="button-row">
		<a href={`/trips`} class="cancel">Cancel</a>
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
