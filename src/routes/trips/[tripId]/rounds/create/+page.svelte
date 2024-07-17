<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { createRound, roundsSchemas } from '$lib/api';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import SelectMenu from '$lib/components/SelectMenu.svelte';

	let { data } = $props();

	let roundName = $state<string>();
	let courseId = $state<string>();
	let date = $state<string>();
	let errorMessage = $state<string>();

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const parseResult = roundsSchemas.createRoundSchema.safeParse({
			tripId: data.trip.id,
			courseId,
			name: roundName,
			date
		});
		if (!parseResult.success) {
			console.error(parseResult.error);
			return;
		}

		await createRound(parseResult.data);
		await invalidate(`trips:${data.trip.id}`);
		goto(`/trips/${data.trip.id}/rounds`);
	}
</script>

<form class="round-form" onsubmit={handleSubmit}>
	<Input label="Round Name" type="text" placeholder="Round 1" name="name" bind:value={roundName} />
	<SelectMenu label="Course" name="courseId" bind:value={courseId} options={data.courses} />
	<Input label="Date" type="date" name="date" bind:value={date} block />

	{#if errorMessage}<p class="error">{errorMessage}</p>{/if}

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
