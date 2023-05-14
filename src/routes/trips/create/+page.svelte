<script lang="ts">
	import Button from '@components/Button.svelte';
	import Input from '@components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let tripName: string | undefined;
	let startDate: string | undefined;
	let endDate: string | undefined;
</script>

<form class="round-form" method="post" action="?/createTrip">
	<div class="name">
		<Input type="text" name="name" bind:value={tripName} />
	</div>

	<Input type="date" name="startDate" bind:value={startDate} />
	<Input type="date" name="endDate" bind:value={endDate} />

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
			display: flex;
			align-items: center;

			* {
				flex: 1;
				text-align: center;
			}
		}
	}
</style>
